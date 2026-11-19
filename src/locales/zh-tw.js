// 匯入繁體中文模組
import zhFaqs from './zh-TW/faqs.js'

export default {
  // Pages
  index: {
    // 頁面標題與描述
    title: "《 網路韌性法案 》",
    description: "快速對應產品規範<br>掌握漏洞處理與 CE 標記及合規資訊",

    // 導覽 / 通用
    themeToggle: "切換主題",
    login: "登入",
    logout: "登出",

    // 語系選單文字
    langSelect: {
      zh: "繁體中文",
      en: "英文",
    },

    // 角色身分翻譯
    roles: {
      super_admin: "超級管理員",
      admin: "管理員",
      developer: "開發者",
      viewer: "檢視者",
      default: "未登入",
    },

    // 時程區塊
    scheduleTitle: "關鍵時程為何？",
    scheduleSubtitle: "CRA 已於 2024 年 12 月 10 日正式生效，相關義務分階段實施：",
    tableHeaderDate: "日期",
    tableHeaderMilestone: "關鍵時程",
    item1Date: "2024/12/10",
    item1Desc: "CRA 正式生效，義務分階段啟動",
    item2Date: "2026/9/11",
    item2Desc: "通報義務上路：已遭實際利用的漏洞與重大資安事件須通報（含仍在支援週期內的既有產品）",
    item3Date: "2027/12/11",
    item3Desc: "全面強制生效：所有受規範產品須符合要求才能進入歐盟市場",

    // 特色卡片區塊
    feature1Title: "系統性安全",
    feature1Desc: "通過 IEC 62443-4-1 認證的安全開發生命週期 (SDLC) 與 CRA 關鍵要求相符。",
    feature2Title: "偵測與確認漏洞",
    feature2Desc: "第一時間識別出產品中的安全漏洞<br>並進行管理。",
    feature3Title: "與時俱進的解決方案",
    feature3Desc: "主動遵循法規要求<br>不斷演進的歐盟標準。",

    // 常見問題區塊
    faqSectionTitle: "常見問題？",
    searchPlaceholder: "輸入關鍵字（例如：產品要求、SBOM、漏洞處理...）",
    noResultsTitle: "找不到相關的 CRA 規範解答",
    noResultsDesc: "您可以嘗試更換關鍵字或重設分類條件。",
  },
  footer: {
    copyright: "&copy; {{year}} CRA 網路韌性法案. All rights reserved.",
  },
  authModal: {
    title: "選擇登入身分",
    subtitle: "請選擇要切換的測試角色權限",
    emailLabel: "信箱",
    emailPlaceholder: "請輸入信箱",
    passwordLabel: "密碼",
    passwordPlaceholder: "請輸入密碼",
    submitBtn: "登入",
  },
  toast: {
    defaultSuccess: "已成功送出！",
    logout: "已成功登出，目前為未登入狀態",
    loginAs: "已成功以【{{roleName}}】身分登入！",
  },
  // API
  categories: {
    all: "全部問題",
    product: "產品要求",
    vulnerability: "漏洞處理",
    label: "資訊與標記",
  },
  faqs: zhFaqs
};
