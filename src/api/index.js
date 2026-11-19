import request from "./request.js";
// 靜態檔案伺服器不會驗 Token
// 像 Live Server、Nginx 直接吐 .json 檔時，
// 它只負責「把檔案傳給瀏覽器」，不會去解析 Authorization 標頭
// 所以目前第一次打API 時候會看不到
// 要登入後 重新整理 才會看到 Authorization 標頭

// ===================
// ... GET ...
// ===================
// 因為目前是接靜態,
export const apiGetFaqs = () => request.get("/faqs.json", { requiresAuth: true });
export const apiGetCategories = () => request.get("/categories.json", { requiresAuth: true });
export const apiGetUserRoles = () => request.get("/userRoles.json");

// GET 帶查詢參數 → /faqs?categoryId=1&page=2
export const apiGetSearchFaqs = (params) => request.get("/faqs", { params, requiresAuth: true });
// GET 單筆 → /faqs/5
export const apiGetFaqById = (id) => request.get(`/faqs/${id}`, { requiresAuth: true });

// ===================
// ... POST ...
// ===================
export const apiCreateFaq = (data) => request.post("/faqs", data, { requiresAuth: true });
export const apiCreateLogin = (data) => request.post("/auth/login", data);
