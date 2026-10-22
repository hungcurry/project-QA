export default {
  // pages
  index: {
    title: "《 網路韌性法案 》",
    description: "快速查找產品問題<br>漏洞處理流程及 CE 標記與資訊標示",
  },
  // API
  categories: {
    all: "全部",
    product: "產品",
    vulnerability: "漏洞",
    label: "資訊與標記",
  },
  faq: {
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
