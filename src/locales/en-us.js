// 匯入英文模組
import enFaqs from './en-US/faqs.js'

export default {
  // Pages
  index: {
    // 頁面標題與描述
    title: "Cyber Resilience Act (CRA)",
    description:
      "Quickly match product requirements,<br>master vulnerability handling, and ensure CE marking and compliance information.",

    // 導覽 / 通用
    themeToggle: "Toggle Theme",
    login: "Login",
    logout: "Logout",

    // 語系選單文字
    langSelect: {
      zh: "Traditional Chinese",
      en: "English",
    },

    // 角色身分翻譯
    roles: {
      super_admin: "Super Administrator",
      admin: "Administrator",
      developer: "Developer",
      viewer: "Viewer",
      default: "Not Logged In",
    },

    // 時程區塊
    scheduleTitle: "What is the key timeline?",
    scheduleSubtitle:
      "The CRA officially entered into force on December 10, 2024, with obligations implemented in phases:",
    tableHeaderDate: "Date",
    tableHeaderMilestone: "Milestone",
    item1Date: "2024/12/10",
    item1Desc: "CRA officially enters into force, with phased obligations kicking off.",
    item2Date: "2026/9/11",
    item2Desc:
      "Reporting obligations take effect: Actively exploited vulnerabilities and major cybersecurity incidents must be reported (including legacy products still within their support period).",
    item3Date: "2027/12/11",
    item3Desc:
      "Full mandatory enforcement: All regulated products must comply to enter the EU market.",

    // 特色卡片區塊
    feature1Title: "Systematic Security",
    feature1Desc:
      "Complies with CRA key requirements through a Secure Development Life Cycle (SDLC) certified by IEC 62443-4-1.",
    feature2Title: "Detect and Verify Vulnerabilities",
    feature2Desc: "Quickly identify and manage security vulnerabilities within products.",
    feature3Title: "Future-Proof Solutions",
    feature3Desc: "Proactively complies with regulatory requirements and evolving EU standards.",

    // 常見問題區塊
    faqSectionTitle: "FAQ",
    searchPlaceholder: "Enter keywords (e.g., product requirements, SBOM, vulnerability...)",
    noResultsTitle: "No matching CRA compliance answers found",
    noResultsDesc: "Try changing your keywords or resetting category filters.",

    // 分頁
    pagination: {
      info: "Showing {{start}}-{{end}} of {{total}} items",
    }
  },
  footer: {
    copyright: "&copy; {{year}} EU Cyber Resilience Act (CRA). All rights reserved.",
  },
  authModal: {
    title: "Member Login (Authorization)",
    subtitle: "Please enter your credentials to log in, or click below for quick testing accounts.",
    emailLabel: "Email",
    emailPlaceholder: "e.g., pm@cra.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    submitBtn: "Confirm Login",
  },
  toast: {
    defaultSuccess: "Submitted successfully!",
    logout: "Successfully logged out, currently not logged in",
    loginAs: "Successfully logged in as [{{roleName}}]!",
  },
  // API
  categories: {
    all: "All",
    product: "Product Requirements",
    vulnerability: "Vulnerability Management",
    label: "Information & Labels",
  },
  faqs: enFaqs
};
