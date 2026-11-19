// prettier-ignore
import {
  // GET
  apiGetFaqs,
  apiGetCategories,
  apiGetUserRoles,
  // POST
  apiCreateFaq,
  apiCreateLogin
} from "../api/index.js";

// ===================
// ... State ...
// ===================
const contentState = {
  faqs: [],
  categories: [],
  isLoaded: false,
};
const authMockState = {
  userRoles: [],
  isLoaded: false,
};
let allDataPromise = null;

// ===================
// Mock Helpers
// ===================
async function loadUserRoles() {
  const userRoles = await apiGetUserRoles();
  // console.log("userRoles", userRoles);
  return Array.isArray(userRoles) ? userRoles : [];
}
async function verifyMockUserRoles(credentials = {}) {
  const email = credentials.email?.trim() ?? "";
  const password = credentials.password ?? "";

  if (!email || !password) {
    throw new Error("請輸入帳號與密碼");
  }

  // 模擬資料庫還沒載入
  if (!authMockState.isLoaded) {
    authMockState.userRoles = await loadUserRoles();
    authMockState.isLoaded = true;
  }

  const matchedUser = authMockState.userRoles.find(
    (user) => user.role !== "default" && user.email === email && user.password === password,
  );

  if (!matchedUser) {
    throw new Error("帳號或密碼錯誤");
  }

  const { password: _removedPassword, ...safeUser } = matchedUser;

  return {
    token: `mock-jwt-token-${Date.now()}`,
    user: safeUser,
  };
}

// ===================
// ... GET ...
// ===================
// 初始化所有資料（呼叫API）
export async function fetchAllData() {
  if (contentState.isLoaded) {
    return;
  }

  if (allDataPromise) {
    return await allDataPromise;
  }
  // prettier-ignore
  try {
    allDataPromise = Promise.all([
      apiGetFaqs(),
      apiGetCategories(),
    ]);
    const [faqs, categories] = await allDataPromise;

    contentState.faqs = faqs;
    contentState.categories = categories;
    contentState.isLoaded = true;
    console.log("Store 所有資料初始化成功");
  }
  catch (error) {
    throw error;
  }
  finally {
    allDataPromise = null;
  }
}
// Getter
export const getFaqs = () => contentState.faqs;
export const getCategories = () => contentState.categories;
export const getIsLoadedData = () => contentState.isLoaded;

// ===================
// ... POST ...
// ===================
export async function fetchCreateFaq(data) {
  const newFaq = await apiCreateFaq(data);
  contentState.faqs = [...contentState.faqs, newFaq];
  return newFaq;
}
export async function fetchCreateLogin(data) {
  // prettier-ignore
  try {
    // 真的發送 HTTP POST 請求  "/auth/login"
    // const result = await apiCreateLogin(data);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const result = await verifyMockUserRoles(data);

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
