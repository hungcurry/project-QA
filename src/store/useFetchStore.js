// ===================
// ... API ...
// ===================
async function fetchFaqsApi() {
  try {
    const res = await axios.get("../data/faq.json");
    return res.data;
  } catch (error) {
    console.error("取得 FAQ 資料失敗", error);
    throw error;
  }
}
async function fetchCategoriesApi() {
  try {
    const res = await axios.get("../data/categories.json");
    return res.data;
  } catch (error) {
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
  try {
    await Promise.all([fetchFaqs(), fetchCategories()]);

    state.isLoaded = true;
    console.log("Store 所有資料初始化成功");
  } catch (error) {
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
