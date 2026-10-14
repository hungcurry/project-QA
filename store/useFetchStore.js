// import axios from 'axios';
import { faqData, categoryData } from '../data/index.js'
// ===================
// ... API ...
// ===================
async function fetchFaqsApi() {
  await new Promise((resolve) => setTimeout(resolve, 500))
  // return axios.get('/api/faqs').then(res => res.data);

  const res = {
    status: 200,
    data: faqData,
  }
  return res.data
}
async function fetchCategoriesApi() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  // return axios.get('/api/categories').then(res => res.data);

  const res = {
    status: 200,
    data: categoryData,
  }
  return res.data
}

// ===================
// ... Store ...
// ===================
let state = {
  faqs: [],
  categories: [],
  isLoaded: false,
}
async function fetchFaqs() {
  try {
    state.faqs = await fetchFaqsApi()
    // console.log('API 回傳 faqData 成功:', state.faqs);
  }
  catch (error) {
    console.error('取得資料失敗', error)
    throw error
  }
}
async function fetchCategories() {
  try {
    state.categories = await fetchCategoriesApi()
    // console.log('API 回傳 categoryData 成功:', state.categories);
  }
  catch (error) {
    console.error('取得資料失敗', error)
    throw error
  }
}
// 初始化所有資料（呼叫API）
export async function fetchAllData() {
  if (state.isLoaded) return // 避免重複請求
  try {
    await Promise.all([
      fetchFaqs(),
      fetchCategories(),
    ])

    state.isLoaded = true
    console.log('Store 所有資料初始化成功')
  }
  catch (error) {
    console.error('Store 載入失敗', error)
  }
}
// Getter
export function getFaqs() {
  return state.faqs
}
export function getCategories() {
  return state.categories
}
