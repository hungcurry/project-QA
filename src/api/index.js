import request from "./request.js";

// ===================
// ... GET ...
// ===================
export const apiGetFaqs = () => request.get("/faqs.json");
export const apiGetCategories = () => request.get("/categories.json");
export const apiGetUserRoles = () => request.get("/userRoles.json");

// GET 帶查詢參數 → /faqs?categoryId=1&page=2
export const apiGetSearchFaqs = (params) => request.get("/faqs", { params });
// GET 單筆 → /faqs/5
export const apiGetFaqById = (id) => request.get(`/faqs/${id}`);

// ===================
// ... POST ...
// ===================
// 新增一筆 FAQ，data 會放在 request body
export const apiCreateFaq = (data) => request.post("/faqs", data);
// 送出表單 / 回饋
export const apiCreateFeedback = (data) => request.post("/feedback", data);
