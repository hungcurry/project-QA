  import { fetchAllData, getFaqs, getCategories } from '../store/useFetchStore.js'

  // 搜尋與篩選邏輯
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearch');
  const categoryFilters = document.getElementById('categoryFilters');
  const faqList = document.getElementById('faqList');
  const noResultsDiv = document.getElementById('noResults');
  let faqData = [];
  let filterData = [];
  let currentCategory = 'all';
  let categoryData = [];
  let searchTimer = null;

  // ===================
  // ... Data ...
  // ===================
  // computed 篩選
  function getFilterData() {
    if (!faqData || faqData.length === 0) return;

    const keyword = searchInput.value.toLowerCase().trim();// 轉成小寫
    filterData = faqData.filter(item => {
      // 條件 A：分類有沒有符合？
      const matchesCategory = (currentCategory === 'all' || item.category === currentCategory);

      // 條件 B：關鍵字有沒有符合？
      // 檢查「問題」或「答案」之中是否包含關鍵字
      // 預設 任何字串都包含空字串 ("")
      const matchesKeyword = (item.question.toLowerCase().includes(keyword) || item.answer.toLowerCase().includes(keyword));
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
    if (pageData.length === 0) {
      noResultsDiv.classList.remove('hidden');
      document.getElementById('paginationContainer').classList.add('hidden');
      faqList.innerHTML = '';
      return;
    }

    faqList.innerHTML = '';
    const keyword = searchInput.value.trim();
    noResultsDiv.classList.add('hidden');

    // 渲染當前頁面的資料
    pageData.forEach((item) => {
      const highlightedQuestion = highlightText(item.question, keyword);
      const highlightedAnswer = highlightText(item.answer, keyword);

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
      faqList.insertAdjacentHTML('beforeend', itemHtml);
    });
  }
  // 渲染 分類按鈕 畫面
  function renderCategories() {
    categoryFilters.innerHTML = '';

    categoryData.forEach(item => {
      const isActive = item.category === currentCategory;

      const btnHtml = `
      <button
        data-category="${item.category}"
        class="category-btn ${isActive ? 'category-btn-active' : ''} shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer github-dark"
      >
        ${item.label}
      </button>
    `;

      categoryFilters.insertAdjacentHTML('beforeend', btnHtml);
    });
  }
  // 關鍵字高亮
  function highlightText(text, keyword) {
    if (!keyword) return text;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<span class="bg-primary-50 text-primary-700 font-semibold px-1 rounded">$1</span>');
  }

  // ===================
  // ... Events ...
  // ===================
  // 分類篩選事件
  function handleCategoryFilter(e) {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;

    currentCategory = btn.dataset.category;
    // 切換 Active 狀態，避免整塊重新渲染
    categoryFilters.querySelectorAll('.category-btn').forEach(b => {
      const isActive = b.dataset.category === currentCategory;
      b.classList.toggle('category-btn-active', isActive);
    });

    currentPage = 1; // 切換分類時重置回第一頁
    updateView();
  }
  // 搜尋事件
  function handleSearch(e) {
    const value = e.target.value.trim();
    clearSearchBtn.classList.toggle('hidden', value.length === 0);

    // Debounce 防抖動優化效能,過度觸發
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      currentPage = 1; // 搜尋時重置回第一頁
      updateView();
    }, 300);
  }
  // 清除搜尋事件
  function handleClearSearch(e) {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');

    currentPage = 1; // 清除搜尋時重置回第一頁
    updateView();
    searchInput.focus();
  }
  // 展開收合事件
  function handleAccordion(e) {
    const questionBtn = e.target.closest('.faq-question');
    if (!questionBtn) return;

    const item = questionBtn.closest('.faq-item');
    const answerDiv = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // 全部關閉
    faqList.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-answer').classList.remove('active');
    });

    // 如果原本是關閉的，就打開目前這個
    if (!isActive) {
      item.classList.add('active');
      answerDiv.classList.add('active');
    }
  }

  categoryFilters.addEventListener('click', handleCategoryFilter);
  searchInput.addEventListener('input', handleSearch);
  clearSearchBtn.addEventListener('click', handleClearSearch);
  faqList.addEventListener('click', handleAccordion);

  // ===================
  // ... Pagination ...
  // ===================
  const paginationContainer = document.getElementById('paginationContainer');
  const paginationInfoEl = document.getElementById('paginationInfo');
  const paginationButtonsEl = document.getElementById('paginationButtons');
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
    const { dataLength, totalPages, startIndex, endIndex } = state

    if (dataLength > dataNum) {
      paginationContainer.classList.remove('hidden');
      paginationInfoEl.textContent = `顯示第 ${startIndex + 1}-${endIndex} 筆，共 ${dataLength} 筆`;
      renderButtons(totalPages);
    }
    else {
      paginationContainer.classList.add('hidden');
      paginationButtonsEl.innerHTML = '';
    }
  }

  function renderButtons(totalPages) {
    if (totalPages <= 0) {
      paginationButtonsEl.innerHTML = '';
      return;
    }

    const baseBtnClass = 'pagination-btn px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors';
    const disabledStyle = 'disabled:opacity-40 disabled:cursor-not-allowed';
    const activeStyle = 'bg-red-600 text-white border-red-600 shadow-sm'
    const defaultStyle = 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 github-dark';

    // 產生頁碼按鈕的 HTML / totalPages = 2
    let pageButtonsHTML = '';
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
    <button data-page="${Math.max(1, currentPage - 1)}" ${prevDisabled ? 'disabled' : ''}
      class="${baseBtnClass} ${defaultStyle} ${disabledStyle}">
      <i class="fa-solid fa-chevron-left text-[10px]"></i>
    </button>

    ${pageButtonsHTML}

    <button data-page="${Math.min(totalPages, currentPage + 1)}" ${nextDisabled ? 'disabled' : ''}
      class="${baseBtnClass} ${defaultStyle} ${disabledStyle}">
      <i class="fa-solid fa-chevron-right text-[10px]"></i>
    </button>
  `;
  }

  function handleChangePage(e) {
    const btn = e.target.closest('.pagination-btn');
    if (!btn || btn.disabled) return;

    const targetPage = Number(btn.dataset.page);

    // 確保目標頁碼有效，且不是當前頁面
    if (targetPage && targetPage !== currentPage) {
      currentPage = targetPage;
      // 重新渲染內容與分頁按鈕
      const state = getPaginationState(filterData);
      renderFaqs(state.pageData);
      renderPagination(state);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  }

  paginationButtonsEl.addEventListener('click', handleChangePage);

  // ===================
  // ... Menu ...
  // ===================
  const mobileMenuIcon = document.getElementById('mobileMenuIcon');
  const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
  const navMenu = document.getElementById('navMenu'); // 對應 HTML 中的共用按鈕選單容器

  function toggleMobileMenu() {
    if (!navMenu || !mobileMenuIcon) return;

    // 檢查目前是否為隱藏狀態（正向思考：isHidden）
    const isHidden = navMenu.classList.contains('hidden');

    if (isHidden) {
      // 展開選單：移除 hidden，並加上 flex 讓它顯示
      navMenu.classList.remove('hidden');
      navMenu.classList.add('flex');
      mobileMenuIcon.className = 'fa-solid fa-xmark';
    } else {
      // 收合選單：加上 hidden，並移除 flex
      navMenu.classList.add('hidden');
      navMenu.classList.remove('flex');
      mobileMenuIcon.className = 'fa-solid fa-bars';
    }
  }

  function closeMobileMenu() {
    if (!navMenu || !mobileMenuIcon) return;

    navMenu.classList.add('hidden');
    navMenu.classList.remove('flex');
    mobileMenuIcon.className = 'fa-solid fa-bars';
  }

  mobileMenuToggleBtn.addEventListener('click', toggleMobileMenu);

  // 亮/暗模式
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  function toggleTheme() {
    const htmlEl = document.documentElement;
    const isDark = htmlEl.classList.toggle('dark');

    // 切換圖示：暗模式顯示月亮，亮模式顯示太陽
    if (isDark) {
      themeIcon.className = 'fa-solid fa-moon text-indigo-400';
      localStorage.setItem('CRA-theme', 'dark');
    } else {
      themeIcon.className = 'fa-solid fa-sun text-amber-500';
      localStorage.setItem('CRA-theme', 'light');
    }
  }

  // 初始化：檢查 localStorage 或系統偏好
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon text-indigo-400';
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun text-amber-500';
    }
  }
  // 頁面載入時執行初始化
  initTheme();

  themeToggleBtn.addEventListener('click', toggleTheme);


  // init
  async function initialize() {
    // data
    await fetchAllData()
    faqData = getFaqs()
    categoryData = getCategories()

    updateView();
    renderCategories();
  }
  // 更新畫面
  function updateView() {
    filterData = getFilterData();

    // renderFaqs(filterData);
    // 或
    const state = getPaginationState(filterData);
    renderFaqs(state.pageData);
    renderPagination(state);
  }

  initialize();
