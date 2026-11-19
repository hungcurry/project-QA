import axios from "axios";
// ===================
// ... API ...
// ===================
async function fetchFaqsApi() {
  // prettier-ignore
  try {
    const res = await axios.get("../data/faqs.json");
    return res.data;
  }
  catch (error) {
    console.error("取得 FAQ 資料失敗", error);
    throw error;
  }
}
async function fetchCategoriesApi() {
  // prettier-ignore
  try {
    const res = await axios.get("../data/categories.json");
    return res.data;
  }
  catch (error) {
    console.error("取得 Categories 資料失敗", error);
    throw error;
  }
}

// ===================
// ... Store 狀態管理
// ===================
let state = {
  faqs: [],
  categories: [],
  isLoaded: false,
};
async function fetchFaqs() {
  state.faqs = await fetchFaqsApi();
}
async function fetchCategories() {
  state.categories = await fetchCategoriesApi();
}
// 初始化所有資料（呼叫API）
export async function fetchAllData() {
  if (state.isLoaded) return;

  // prettier-ignore
  try {
    await Promise.all([
      fetchFaqs(),
      fetchCategories()
    ]);

    state.isLoaded = true;
    console.log("Store 所有資料初始化成功");
  }
  catch (error) {
    console.error("Store 載入失敗", error);
  }
}
// Getter
export function getFaqs() {
  return state.faqs;
}
export function getCategories() {
  return state.categories;
}
// ----------------------------

let useState = {
  userRoles: [],
  isLoaded: false,
};
async function fetchUserRolesApi() {
  try {
    // 模擬從資料庫（JSON 檔案）取得所有使用者資料清單
    const res = await axios.get("../data/userRoles.json");
    return res.data;
  }
  catch (error) {
    console.error("取得 Users 資料失敗", error);
    throw error;
  }
}
async function fetchUserRoles(email, password) {
  // 1. 模擬資料庫還沒載入
  if (!useState.isLoaded) {
    useState.userRoles = await fetchUserRolesApi();
    useState.isLoaded = true;
  }

  // 2. 模擬後端 POST 驗證：從 Store 資料庫中尋找相符的使用者
  const matchedUser = useState.userRoles.find(
    (user) => user.role !== "default" && user.email === email && user.password === password
  );

  // 3. 驗證失敗：直接拋出錯誤，讓前端 catch 捕捉
  if (!matchedUser) {
    throw new Error("帳號或密碼錯誤");
  }

  // 4. 驗證成功：包裝資料並加上模擬的 Token 回傳給前端
  const responseData = {
    token: `mock-jwt-token-${Date.now()}`, // 模擬產生的 Token
    user: matchedUser,
  };

  return responseData;
}
export async function apiLogin(email, password) {
  try {
    // 模擬網路傳輸的延遲 (例如 300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 前端發送 POST，實際上是呼叫我們寫好的 Store 驗證函式
    const result = await fetchUserRoles(email, password);

    // 如果後端/Store 驗證失敗回傳 null，前端拋出錯誤
    if (!result) {
      throw new Error("帳號或密碼錯誤");
    }

    // 模擬成功接收到後端回傳的 Response (例如 status 200)
    return {
      status: 200,
      data: {
        token: result.token,
        user: result.user,
        message: "登入成功"
      }
    };

  }
  catch (error) {
    console.error("API Login 失敗:", error.message);
    throw error; // 讓外層 handleLogin 捕捉並跳出提示
  }
}

