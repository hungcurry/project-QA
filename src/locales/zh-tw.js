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
    copyright: "&copy; 2026 CRA 網路韌性法案. All rights reserved.",
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
    all: "全部",
    product: "產品",
    vulnerability: "漏洞",
    label: "資訊與標記",
  },
  faqs: {
    cra_intro: {
      question: "什麼是歐盟網路韌性法案(CRA)?",
      answer:
        "歐盟《網路韌性法案》(CRA)是一項歐盟法規，為所有在歐盟市場銷售，內含數位元件的產品（包括硬體與軟體）制定強制性的網路安全要求。",
    },
    cra_requirements: {
      question: "CRA 對於上市產品在「產品要求」上有哪些核心規範？",
      answer:
        "依據 CRA 規範，產品必須具備適當級別的安全性，且交付的產品必須沒有已知漏洞。製造商須落實預設安全、啟用充分的安全更新等。",
    },
    vulnerability_process: {
      question: "製造商在「漏洞處理流程」中必須執行哪些關鍵步驟？",
      answer:
        "漏洞處理流程涵蓋完整的生命週期管理：包含產出與維護 SBOM、追蹤漏洞並消除已知漏洞、立即處理新發現漏洞等。",
    },
    compliance_documents: {
      question: "在「資訊和標記」部分，製造商需要準備哪些合規檔案與聲明？",
      answer:
        "資訊和標記要求包括 CE 標誌認證與歐盟符合性聲明 (DoC)、任命授權代表、技術文件（包含網路安全風險評估）與 SBOM 等。",
    },
    sbom_importance: {
      question: "為什麼 SBOM（軟體物料清單）在 CRA 漏洞處理中如此重要？",
      answer:
        "SBOM 能夠協助製造商精確識別產品中包含的所有第三方與開源軟體依賴項，當漏洞爆發時能在最短時間內追蹤受影響範圍。",
    },
  },
};
