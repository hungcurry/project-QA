// prettier-ignore
import {
  // GET
  apiGetFaqs,
  apiGetCategories,
  apiGetUserRoles,
  // POST
  apiCreateFaq
} from "../api/index.js";

// ===================
// ... Data ...
// ===================
const state = {
  faqs: [],
  categories: [],
  isLoaded: false,
};
const useState = {
  userRoles: [],
  isLoaded: false,
};
let loadPromise = null;

// ===================
// ... GET ...
// ===================
// 模擬資料庫抓資料,所以在這邊執行 沒丟出去
const GetUserRoles = async () => {
  const userRoles = await apiGetUserRoles();
  // console.log("userRoles", userRoles);
  return userRoles;
};
// GetUserRoles();

// 初始化所有資料（呼叫API）
export const fetchAllData = async () => {
  if (state.isLoaded) return;

  if (loadPromise) {
    return await loadPromise;
  }
  // prettier-ignore
  try {
    loadPromise = Promise.all([
      apiGetFaqs(),
      apiGetCategories(),
    ]);
    console.log("Store 所有資料初始化成功");

    const [faqs, categories] = await loadPromise;

    state.faqs = faqs;
    state.categories = categories;
    state.isLoaded = true;
  }
  catch (error) {
    loadPromise = null;
    throw error;
  }
};
// Getter
export const getFaqs = () => state.faqs;
export const getCategories = () => state.categories;

// ===================
// ... POST ...
// ===================
export const handleCreateFaq = async (data) => {
  const newFaq = await apiCreateFaq(data);
  state.faqs = [...state.faqs, newFaq];
  return newFaq;
};
// Getter
export const getIsLoaded = () => state.isLoaded;

// 模擬後端函式
async function handleUserRoles(data) {
  // 1. 模擬資料庫還沒載入
  if (!useState.isLoaded) {
    useState.userRoles = await GetUserRoles();
    useState.isLoaded = true;
  }

  // 2. 模擬後端 POST 驗證：從 Store 資料庫中尋找相符的使用者
  const { email, password } = data;
  const matchedUser = useState.userRoles.find(
    (user) => user.role !== "default" && user.email === email && user.password === password,
  );

  // 3. 驗證失敗：直接拋出錯誤，讓前端 catch 捕捉
  if (!matchedUser) {
    throw new Error("帳號或密碼錯誤");
  }

  // 4. 驗證成功：包裝資料並加上模擬的 Token 回傳給前端
  const responseData = {
    // 模擬產生的 Token
    token: `mock-jwt-token-${Date.now()}`,
    user: matchedUser,
  };

  return responseData;
}
export async function fetchLogin(data) {
  // prettier-ignore
  try {
    // 真的發送 HTTP POST 請求
    // const result = await request.post("/auth/login", {
    //   email: data.email,
    //   password: data.password,
    // });
    await new Promise((resolve) => setTimeout(resolve, 300));
    const result = await handleUserRoles(data);

    if (!result) {
      throw new Error("帳號或密碼錯誤");
    }

    return {
      status: 200,
      data: {
        token: result.token,
        user: result.user,
        message: "登入成功",
      },
    };
  }
  catch (error) {
    console.error("API Login 失敗:", error.message);
    throw error;
  }
}
