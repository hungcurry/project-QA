import { fetchAllData, getFaqs, getCategories } from "../store/useFetchStore.js";

// 搜尋與篩選邏輯
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const categoryFilters = document.getElementById("categoryFilters");
const faqList = document.getElementById("faqList");
const noResultsDiv = document.getElementById("noResults");
let faqData = [];
let filterData = [];
let currentCategory = "all";
let categoryData = [];
let searchTimer = null;

// ===================
// ... Data ...
// ===================
// computed 篩選
function getFilterData() {
  if (!faqData || faqData.length === 0) return;

  // 防禦性檢查：若 searchInput 不存在，直接回傳預設值或不進行關鍵字過濾
  const keyword =
    searchInput && searchInput.value
      ? searchInput.value.toLowerCase().trim() // 轉成小寫
      : "";

  filterData = faqData.filter((item) => {
    // 條件 A：分類有沒有符合？
    const matchesCategory = currentCategory === "all" || item.category === currentCategory;

    // 條件 B：關鍵字有沒有符合？
    // 檢查「問題」或「答案」之中是否包含關鍵字
    // 預設 任何字串都包含空字串 ("")
    const question = getFaqText(item, "question");
    const answer = getFaqText(item, "answer");

    const matchesKeyword =
      question.toLowerCase().includes(keyword) || answer.toLowerCase().includes(keyword);
    // 回傳 true 代表保留這筆資料，false 代表過濾掉
    const iskeep = matchesCategory && matchesKeyword;
    return iskeep;
  });

  console.log(`filterData`, filterData);
  return filterData;
}

// ===================
// ... Render ...
// ===================
// 渲染 Q&A 畫面
function renderFaqs(pageData) {
  // 如果元素不存在，直接中斷，避免報錯崩潰
  if (!faqList) return;

  if (pageData.length === 0) {
    noResultsDiv.classList.remove("hidden");
    document.getElementById("paginationContainer").classList.add("hidden");
    faqList.innerHTML = "";
    return;
  }

  faqList.innerHTML = "";
  const keyword = searchInput.value.trim();
  noResultsDiv.classList.add("hidden");

  // 渲染當前頁面的資料
  pageData.forEach((item) => {
    const question = getFaqText(item, "question");
    const answer = getFaqText(item, "answer");

    const highlightedQuestion = highlightText(question, keyword);

    const highlightedAnswer = highlightText(answer, keyword);

    const itemHtml = `
        <div class="faq-item bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden transition-all github-dark" data-category="${item.category}">
          <button class="faq-question w-full px-4 sm:px-6 py-3.5 sm:py-4 text-left flex items-center justify-between focus:outline-none cursor-pointer transition-colors">
            <span class="font-semibold text-slate-800 text-sm sm:text-base flex items-center gap-3 pr-2 leading-snug">
              <!-- 圓形底座的 ? 圖示 -->
              <span class="w-7 h-7 rounded-full bg-red-300 text-white faq-q-icon flex items-center justify-center shrink-0 text-xs shadow-xs transition-colors">
                <i class="fa-solid fa-question"></i>
              </span>
              <!-- 題目文字 (加上 class 方便在展開時切換文字顏色) -->
              <span class="faq-text-title text-slate-800 transition-colors dark:text-gray-200">${highlightedQuestion}</span>
            </span>
            <!-- 右側圖示：未展開顯示 +，展開透過 CSS 切換為 - -->
            <i class="fa-solid fa-plus text-slate-400 faq-icon shrink-0 text-sm transition-colors"></i>
          </button>
          <div class="faq-answer px-4 sm:px-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 bg-white github-dark">
            ${highlightedAnswer}
          </div>
        </div>
      `;
    faqList.insertAdjacentHTML("beforeend", itemHtml);
  });
}
// 渲染 分類按鈕 畫面
function renderCategories() {
  // 如果元素不存在，直接中斷，避免報錯崩潰
  if (!categoryFilters) return;

  categoryFilters.innerHTML = "";

  categoryData.forEach((item) => {
    const isActive = item.category === currentCategory;

    const label = i18next.t(`categories.${item.translationKey}`, {
      defaultValue: item.label,
    });

    const btnHtml = `
      <button
        data-category="${item.category}"
        class="category-btn ${
          isActive ? "category-btn-active" : ""
        } shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer github-dark"
      >
        ${label}
      </button>
    `;

    categoryFilters.insertAdjacentHTML("beforeend", btnHtml);
  });
}
// 關鍵字高亮
function highlightText(text, keyword) {
  if (!keyword) return text;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.replace(
    regex,
    '<span class="bg-primary-50 text-primary-700 font-semibold px-1 rounded">$1</span>',
  );
}

// ===================
// ... Events ...
// ===================
// 分類篩選事件
function handleCategoryFilter(e) {
  const btn = e.target.closest(".category-btn");
  if (!btn) return;

  currentCategory = btn.dataset.category;
  // 切換 Active 狀態，避免整塊重新渲染
  categoryFilters.querySelectorAll(".category-btn").forEach((b) => {
    const isActive = b.dataset.category === currentCategory;
    b.classList.toggle("category-btn-active", isActive);
  });

  currentPage = 1; // 切換分類時重置回第一頁
  updateView();
}
// 搜尋事件
function handleSearch(e) {
  const value = e.target.value.trim();
  clearSearchBtn.classList.toggle("hidden", value.length === 0);

  // Debounce 防抖動優化效能,過度觸發
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentPage = 1; // 搜尋時重置回第一頁
    updateView();
  }, 300);
}
// 清除搜尋事件
function handleClearSearch(e) {
  searchInput.value = "";
  clearSearchBtn.classList.add("hidden");

  currentPage = 1; // 清除搜尋時重置回第一頁
  updateView();
  searchInput.focus();
}
// 展開收合事件
function handleAccordion(e) {
  const questionBtn = e.target.closest(".faq-question");
  if (!questionBtn) return;

  const item = questionBtn.closest(".faq-item");
  const answerDiv = item.querySelector(".faq-answer");
  const isActive = item.classList.contains("active");

  // 全部關閉
  faqList.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
    item.querySelector(".faq-answer").classList.remove("active");
  });

  // 如果原本是關閉的，就打開目前這個
  if (!isActive) {
    item.classList.add("active");
    answerDiv.classList.add("active");
  }
}

// 封裝成函數，檢查元素是否存在
function initFaqEventListeners() {
  if (categoryFilters) {
    categoryFilters.addEventListener("click", handleCategoryFilter);
  }

  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", handleClearSearch);
  }

  if (faqList) {
    faqList.addEventListener("click", handleAccordion);
  }
}
// 確保 DOM 載入完成後執行
document.addEventListener("DOMContentLoaded", () => {
  initFaqEventListeners();
});

// ===================
// ... Pagination ...
// ===================
const paginationContainer = document.getElementById("paginationContainer");
const paginationInfoEl = document.getElementById("paginationInfo");
const paginationButtonsEl = document.getElementById("paginationButtons");
const dataNum = 10; // 取幾筆資料
let currentPage = 1;

// 取得分頁計算狀態
function getPaginationState(data) {
  const dataLength = data.length;
  // Math.ceil(13 / 10) 等於 Math.ceil(1.3)，無條件進位後得到 totalPages = 2
  const totalPages = Math.ceil(dataLength / dataNum);
  // 防呆: 大於頁數降回最後一頁,小於頁數返回第一頁
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const startIndex = (currentPage - 1) * dataNum;
  const endIndex = Math.min(startIndex + dataNum, dataLength);

  const pageData = data.slice(startIndex, endIndex);
  // 確保你的結束索引永遠不會超出陣列的最大長度 13
  // 在第 1 頁時：Math.min(10, 13) 取比較小的 10。
  // 在第 2 頁時：Math.min(20, 13) 取比較小的 13（而不是超出範圍的 20）
  // -----
  // 第 1 頁時 (currentPage = 1)
  // startIndex = (1 - 1) * 10 => 0
  // endIndex = Math.min(0 + 10, 13) => 取最小值 10
  // filterData.slice(0, 10) 抓 1-10 筆資料
  // -----
  // 第 2 頁時 (currentPage = 2)
  // startIndex = (2 - 1) * 10 => 10
  // endIndex = Math.min(10 + 10, 13) => 取最小值 13
  // filterData.slice(10, 13) 抓 11-13 筆資料

  return { dataLength, totalPages, startIndex, endIndex, pageData };
}
function renderPagination(state) {
  // 如果容器不存在，直接中斷，避免報錯
  if (!paginationContainer) return;

  const { dataLength, totalPages, startIndex, endIndex } = state;

  if (dataLength > dataNum) {
    paginationContainer.classList.remove("hidden");
    paginationInfoEl.textContent = `顯示第 ${startIndex + 1}-${endIndex} 筆，共 ${dataLength} 筆`;
    renderButtons(totalPages);
  } else {
    paginationContainer.classList.add("hidden");
    paginationButtonsEl.innerHTML = "";
  }
}
function renderButtons(totalPages) {
  if (totalPages <= 0) {
    paginationButtonsEl.innerHTML = "";
    return;
  }

  const baseBtnClass =
    "pagination-btn px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors";
  const disabledStyle = "disabled:opacity-40 disabled:cursor-not-allowed";
  const activeStyle = "bg-red-600 text-white border-red-600 shadow-sm";
  const defaultStyle = "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 github-dark";

  // 產生頁碼按鈕的 HTML / totalPages = 2
  let pageButtonsHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage;
    const addStyle = isActive ? activeStyle : defaultStyle;

    pageButtonsHTML += `
      <button data-page="${i}" class="${baseBtnClass} ${addStyle}">
        ${i}
      </button>
      `;
  }

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  // 組合全部並寫入 DOM
  paginationButtonsEl.innerHTML = `
    <button data-page="${Math.max(1, currentPage - 1)}" ${prevDisabled ? "disabled" : ""}
      class="${baseBtnClass} ${defaultStyle} ${disabledStyle}">
      <i class="fa-solid fa-chevron-left text-[10px]"></i>
    </button>

    ${pageButtonsHTML}

    <button data-page="${Math.min(totalPages, currentPage + 1)}" ${nextDisabled ? "disabled" : ""}
      class="${baseBtnClass} ${defaultStyle} ${disabledStyle}">
      <i class="fa-solid fa-chevron-right text-[10px]"></i>
    </button>
  `;
}
function handleChangePage(e) {
  const btn = e.target.closest(".pagination-btn");
  if (!btn || btn.disabled) return;

  const targetPage = Number(btn.dataset.page);

  // 確保目標頁碼有效，且不是當前頁面
  if (targetPage && targetPage !== currentPage) {
    currentPage = targetPage;
    // 重新渲染內容與分頁按鈕
    const state = getPaginationState(filterData);
    renderFaqs(state.pageData);
    renderPagination(state);
    window.scrollTo({ top: 200, behavior: "smooth" });
  }
}
// 封裝成函數，檢查元素是否存在
function initPaginationEventListeners() {
  if (paginationButtonsEl) {
    paginationButtonsEl.addEventListener("click", handleChangePage);
  }
}
// 確保 DOM 載入完成後執行
document.addEventListener("DOMContentLoaded", () => {
  initPaginationEventListeners();
});

// ===================
// ... Permission ...
// ===================
// prettier-ignore
import {
  PERMISSIONS,
  ROLES,
  useAdminAuth,
  updateUIByPermission,
} from "./permissions.js";

// 實例化 Composable
// prettier-ignore
const {
  getCurrentRoleKey,
  setCurrentRoleKey,
  getCurrentUser,
  hasPermission,
  hasRole
} = useAdminAuth();

// Modal
// ----------
function openAuthModal(authModal) {
  authModal.classList.remove("hidden");
}
function closeAuthModal(authModal) {
  authModal.classList.add("hidden");
}
// 根據登入狀態切換 Modal 畫面
function updateAuthModalContent() {
  const isLoggedIn = Boolean(getCurrentUser());

  // 💡 加上 console.log 檢查抓到的元素是否存在
  // console.log("當前登入狀態 isLoggedIn:", isLoggedIn);
  // console.log("loginFormSection 元素:", document.getElementById("loginFormSection"));
  // console.log("roleSelectList 元素:", document.getElementById("roleSelectList"));
  // console.log("logoutSection 元素:", document.getElementById("logoutSection"));

  // 登入表單與身分清單
  document.getElementById("loginFormSection")?.classList.toggle("hidden", isLoggedIn);
  document.getElementById("roleSelectList")?.classList.toggle("hidden", isLoggedIn);
  document.getElementById("logoutSection")?.classList.toggle("hidden", !isLoggedIn);

  // 未登入時清空表單
  if (!isLoggedIn) {
    resetLoginForm();
  }
}

// 表單管理
// ----------
// 清空登入表單
function resetLoginForm() {
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
}
// 填入測試帳號
function fillLoginForm(card) {
  // console.log("填入測試帳號:", card);
  document.getElementById("loginEmail").value = card.dataset.email || "";
  document.getElementById("loginPassword").value = card.dataset.password || "";
}

// 登入與登出
// ----------
function handleLogin() {
  const email = document.getElementById("loginEmail")?.value.trim() || "";
  const password = document.getElementById("loginPassword")?.value || "";
  const roleCards = document.querySelectorAll(".role-card");

  // 比對測試帳號
  const matchedCard = Array.from(roleCards).find(
    (card) => card.dataset.email === email && card.dataset.password === password,
  );

  if (!matchedCard) {
    alert("請選擇或輸入有效的測試帳號");
    return;
  }

  const roleKey = matchedCard.dataset.role;

  // 執行登入
  loginAs(roleKey); // admin

  // 關閉 Modal
  closeAuthModal(document.getElementById("authModal"));
}
function handleLogout() {
  logout();

  resetLoginForm();
  closeAuthModal(document.getElementById("authModal"));
}
function loginAs(roleKey) {
  console.log("目前收到的 roleKey 是：", roleKey);

  if (!applyRole(roleKey)) return;

  const roleName = ROLES[roleKey].name;

  if (roleKey === "default") {
    showToast(i18next.t("toast.logout"));
  } else {
    showToast(i18next.t("toast.loginAs", { roleName }));
  }
}
function logout() {
  if (!applyRole("default")) return;

  showToast(i18next.t("toast.logout"));
}
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;

  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3000);
}
// 套用角色
function applyRole(roleKey) {
  if (!setCurrentRoleKey(roleKey)) return false;

  updateUIByPermission();

  return true;
}
// Modal 初始化事件
function initAuthModal() {
  const authBtn = document.getElementById("authBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const authModal = document.getElementById("authModal");
  // 權限身分List
  const roleCards = document.querySelectorAll(".role-card");
  // 登入/登出
  const submitLoginBtn = document.getElementById("submitLoginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // 必要 DOM authBtn/authModal 不存在就不初始化
  if (!authModal) return;

  // 1. 點擊「登入」按鈕開啟 Modal
  authBtn?.addEventListener("click", () => {
    openAuthModal(authModal);
    updateAuthModalContent();
  });

  // ✅ 1-1. 點擊右上角已登入的「身分區塊」也能開啟 Modal（進行登出或切換）
  loggedUserSection?.addEventListener("click", () => {
    openAuthModal(authModal);
    updateAuthModalContent(); // 這會自動切換顯示 logoutSection 讓你按登出
  });

  // 2. 點擊關閉按鈕
  closeModalBtn?.addEventListener("click", () => {
    closeAuthModal(authModal);
  });

  // 3. 點擊 Modal 背景關閉
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      closeAuthModal(authModal);
    }
  });

  // 4. 選擇身分卡片
  roleCards.forEach((card) => {
    card.addEventListener("click", () => {
      fillLoginForm(card);
    });
  });

  // 5. 點擊登入
  submitLoginBtn?.addEventListener("click", handleLogin);

  // 6. 點擊登出
  logoutBtn?.addEventListener("click", handleLogout);
}

// 權限操作管理
// ----------
function handlePermissionAction(target, permissionKey, permissionValue) {
  const permLower = permissionKey.toLowerCase();
  const classList = target.classList;

  if (permLower.includes("create") || classList.contains("create")) {
    alert("新增成功！");
  } else if (permLower.includes("update") || classList.contains("update")) {
    alert("修改成功！");
  } else if (permLower.includes("delete") || classList.contains("delete")) {
    alert("刪除成功！");
  } else {
    console.log(`執行操作：${permissionValue}`);
  }
}
function initPermissionActions() {
  document.addEventListener("click", (e) => {
    // 確認事件目標是 Element
    if (!(e.target instanceof Element)) return;

    // 尋找 data-permission 元素
    const target = e.target.closest("[data-permission]");

    if (!target) return;

    const permissionKey = target.dataset.permission;

    // 取得對應權限值
    const permissionValue = PERMISSIONS[permissionKey] || permissionKey;

    // 檢查權限
    if (!hasPermission(permissionValue)) {
      e.preventDefault();
      e.stopPropagation();

      alert(`權限不足：您的身分沒有執行 ${permissionValue} 的權限！`);
      return;
    }

    // 權限通過，執行操作
    handlePermissionAction(target, permissionKey, permissionValue);
  });
}

// ===================
// ... Menu ...
// ===================
import i18next, { initI18n } from "../locales/index.js";
// import { ROLES } from "./permissions.js";

const mobileMenuIcon = document.getElementById("mobileMenuIcon");
const mobileMenuToggleBtn = document.getElementById("mobileMenuToggleBtn");
const navMenu = document.getElementById("navMenu"); // 對應 HTML 中的共用按鈕選單容器

// 手機選單
// ----------
function toggleMobileMenu() {
  if (!navMenu || !mobileMenuIcon) return;

  // 檢查目前是否為隱藏狀態（正向思考：isHidden）
  const isHidden = navMenu.classList.contains("hidden");

  if (isHidden) {
    // 展開選單：移除 hidden，並加上 flex 讓它顯示
    navMenu.classList.remove("hidden");
    navMenu.classList.add("flex");
    mobileMenuIcon.className = "fa-solid fa-xmark";
  } else {
    // 收合選單：加上 hidden，並移除 flex
    navMenu.classList.add("hidden");
    navMenu.classList.remove("flex");
    mobileMenuIcon.className = "fa-solid fa-bars";
  }
}
function closeMobileMenu() {
  if (!navMenu || !mobileMenuIcon) return;

  navMenu.classList.add("hidden");
  navMenu.classList.remove("flex");
  mobileMenuIcon.className = "fa-solid fa-bars";
}

mobileMenuToggleBtn.addEventListener("click", toggleMobileMenu);

// 亮/暗模式
// ----------
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");

function toggleTheme() {
  const htmlEl = document.documentElement;
  const isDark = htmlEl.classList.toggle("dark");

  // 切換圖示：暗模式顯示月亮，亮模式顯示太陽
  if (isDark) {
    themeIcon.className = "fa-solid fa-moon text-indigo-400";
    localStorage.setItem("CRA-theme", "dark");
  } else {
    themeIcon.className = "fa-solid fa-sun text-amber-500";
    localStorage.setItem("CRA-theme", "light");
  }
}
// 初始化：檢查 localStorage 或系統偏好
function initTheme() {
  const savedTheme = localStorage.getItem("CRA-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
    if (themeIcon) themeIcon.className = "fa-solid fa-moon text-indigo-400";
  } else {
    document.documentElement.classList.remove("dark");
    if (themeIcon) themeIcon.className = "fa-solid fa-sun text-amber-500";
  }
}

themeToggleBtn.addEventListener("click", toggleTheme);

// ===================
// ... i18n ...
// ===================
// import i18next, { initI18n } from "../locales/index.js";

function getInitialLanguage() {
  const savedLang = localStorage.getItem("CRA-lang");
  if (savedLang) return savedLang;

  const systemLang = navigator.language || navigator.userLanguage;
  return systemLang.startsWith("en") ? "en-US" : "zh-TW";
}
function renderI18n() {
  // 這裡直接使用 import 進來的 i18next 進行翻譯
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = i18next.t(el.dataset.i18n, {
      defaultValue: el.innerHTML,
    });
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = i18next.t(el.dataset.i18nPlaceholder, {
      defaultValue: el.placeholder,
    });
  });

  updateLogoVisibility();
  syncLangSelectUI();
}
function updateLogoVisibility() {
  const isEnglish = i18next.language.startsWith("en");
  document.querySelectorAll(".cra-logo-text, .cra-logo-patten").forEach((el) => {
    el.classList.toggle("hidden", isEnglish);
  });
}
function syncLangSelectUI() {
  const langSelect = document.querySelector("#langSelect");
  if (langSelect) {
    langSelect.value = i18next.language.startsWith("en") ? "en-US" : "zh-TW";
  }
}
function bindEvents() {
  const langSelect = document.querySelector("#langSelect");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      handleLanguageChange(e.target.value);
    });
  }
}
function getFaqText(item, field) {
  return i18next.t(`faqs.${item.translationKey}.${field}`, {
    defaultValue: item[field],
  });
}
async function handleLanguageChange(lang) {
  await i18next.changeLanguage(lang);
  localStorage.setItem("CRA-lang", lang);

  renderI18n();
  currentPage = 1;
  updateView();
  renderCategories();

  // ✅ 切換語系時同步更新身分顯示區塊的翻譯文字
  updateUIByPermission();
}

// ===================
// ... init ...
// ===================
// 更新畫面
function updateView() {
  filterData = getFilterData();

  // renderFaqs(filterData);
  // 或
  const state = getPaginationState(filterData);
  renderFaqs(state.pageData);
  renderPagination(state);
}
async function initialize() {
  // 亮/暗模式
  initTheme();
  // 語言切換模式
  const initialLng = getInitialLanguage();
  await initI18n(initialLng);
  renderI18n();
  bindEvents();

  // data
  await fetchAllData();
  faqData = getFaqs();
  categoryData = getCategories();

  // 新更畫面
  updateView();
  renderCategories();

  // ✅ 權限檢查
  // 確保所有渲染、i18n 翻譯都結束後，
  // 才最後根據身分更新介面與導覽列文字
  initAuthModal();
  initPermissionActions();
  updateUIByPermission();
}
document.addEventListener("DOMContentLoaded", () => {
  initialize();
});
