## 專案快速啟動

### (一).資料收集

> 網址

```jsx
https://www.ti.com/zh-tw/technologies/security/cyber-resilience-act.html

https://www.moxa.com/tw/about-us/policies/cyber-resilience-act-cra

https://www.intertek-twn.com/frontend/HtmlEditor.aspx?lang=C&no=10607

圖檔
https://unsplash.com/photos/3d-computer-graphics-rhNff6hB41s

```

> CRA 相關

```jsx
CRA 要求
CRA 法規適用於於歐盟市場供應之具有數位元素的產品與组件，
例如任何處理數位數據的硬體或軟體產品，且該產品預期或合理預期會連接至其他裝置或網路。

網路韌性法案（CRA）

網址: https://www.moxa.com/tw/about-us/policies/cyber-resilience-act-cra

什麼是歐盟網路韌性法案(CRA)？

歐盟《網路韌性法案》(CRA)是一項歐盟法規，為所有在歐盟市場銷售，內含數位元件的產品（包括硬體與軟體）
制定強制性的網路安全要求。其目的是確保這些產品在整個生命週期中，都能維持最高的安全性。
```

> 功能

```jsx
目前主流網站與企業知識庫中最常見且實用的擴充功能建議：
1. ✅ 關鍵字高亮顯示 (Keyword Highlighting)
說明：當使用者在上方搜尋框輸入關鍵字（例如 SBOM）並按下搜尋或篩選時，系統會自動將 Q&A 列表與內文中出現的「SBOM」字眼加上底色或紅字高亮。
效益：大幅提升使用者在長篇大論中尋找特定目標的效率。

1. QA 內容按讚 / 實用性回饋 (Feedback / Voting)
說明：在每個 QA 展開的答案下方，加入簡單的互動按鈕（例如：「這對我有幫助嗎？👍 / 👎」或「解決了我的問題」）。
效益：收集使用者的回饋數據，讓維護團隊知道哪些問題最多人看、哪些解答不夠清楚需要優化。

1. 一鍵複製解答 / 分享連結 (Copy / Share Link)
說明：在展開的 QA 區塊右上角提供「複製答案」或「複製此問題連結」按鈕。
效益：當團隊內部在 Slack / Line 討論合規問題時，PM 或 RD 可以一鍵把精準的解答網址或文字貼給同事，非常適合團隊協作。

1. 相關文章或延伸導航 (Related Questions)
說明：當展開某個 QA（例如關於「SBOM」的說明）時，底部自動推薦 2-3 個相關聯的常見問題（例如「如何自動化產出 SBOM？」）。
效益：引導使用者深入了解相關法規，延長停留時間並減少二次搜尋的麻煩。

1. 常見問題快速標籤 / 熱門關鍵字雲 (Trending Tags)
說明：在搜尋框下方提供幾個目前最熱門的點擊標籤（如 #SBOM、#24小時通報、#CE標記、#Class I）。
效益：讓不知道該搜什麼的使用者可以直接點擊熱門標籤快速篩選，優化首頁互動體驗。
```

### (二).專案相關

> 網址

```jsx
// CDN 
<script src="https://cdn.tailwindcss.com"></script>

// 網址
http://127.0.0.1:5500/src/index.html

http://127.0.0.1:5500/src/search.html

```

> 架構

```jsx
QA/
├── data/
│   ├── categories.json
│   └── faq.json
├── src/
│   ├── css/
│   │   └── style.css
│   ├── all.css
│   ├── index.html
│   └── search.html
├── store/
│   ├── useFetchStore.js
├── package-lock.json
├── package.json
├── README.md
└── tailwind.config.js
```

> 指令

```jsx
// 開發階段（自動監聽並即時編譯）
npx tailwindcss -i ./src/css/style.css -o ./src/all.css --watch
=> npm run dev

// 上線打包（壓縮產出 Minify CSS）
npx tailwindcss -i ./src/css/style.css -o ./src/all.css --minify
=> npm run build
```

> 測試資料

```jsx
const faqData = [
  {
    category: 'product',
    question: '什麼是歐盟網路韌性法案(CRA)?',
    answer: '歐盟《網路韌性法案》(CRA)是一項歐盟法規，為所有在歐盟市場銷售，內含數位元件的產品（包括硬體與軟體）制定強制性的網路安全要求。'
  },
  {
    category: 'product',
    question: 'CRA 對於上市產品在「產品要求」上有哪些核心規範？',
    answer: '依據 CRA 規範，產品必須具備適當級別的安全性，且交付的產品必須沒有已知漏洞。製造商須落實預設安全、啟用充分的安全更新等。'
  },
  {
    category: 'vulnerability',
    question: '製造商在「漏洞處理流程」中必須執行哪些關鍵步驟？',
    answer: '漏洞處理流程涵蓋完整的生命週期管理：包含產出與維護 SBOM、追蹤漏洞並消除已知漏洞、立即處理新發現漏洞等。'
  },
  {
    category: 'label',
    question: '在「資訊和標記」部分，製造商需要準備哪些合規檔案與聲明？',
    answer: '資訊和標記要求包括 CE 標誌認證與歐盟符合性聲明 (DoC)、任命授權代表、技術文件（包含網路安全風險評估）與 SBOM 等。'
  },
  {
    category: 'vulnerability',
    question: '為什麼 SBOM（軟體物料清單）在 CRA 漏洞處理中如此重要？',
    answer: 'SBOM 能夠協助製造商精確識別產品中包含的所有第三方與開源軟體依賴項，當漏洞爆發時能在最短時間內追蹤受影響範圍。'
  }
];

//--------
[
  {
    "id": "3b241101-e2bb-4255-8caf-4136c566a962",
    "translationKey": "cra_intro",
    "category": "product",
    "question": "什麼是歐盟網路韌性法案(CRA)?",
    "answer": "歐盟《網路韌性法案》(CRA)是一項歐盟法規，為所有在歐盟市場銷售，內含數位元件的產品（包括硬體與軟體）制定強制性的網路安全要求。"
  },
  {
    "id": "8f9a2c11-4b12-4c3e-91a5-7f32d8e4b102",
    "translationKey": "cra_requirements",
    "category": "product",
    "question": "CRA 對於上市產品在「產品要求」上有哪些核心規範？",
    "answer": "依據 CRA 規範，產品必須具備適當級別的安全性，且交付的產品必須沒有已知漏洞。製造商須落實預設安全、啟用充分的安全更新等。"
  },
  {
    "id": "1e5b4c77-9a82-4f10-b3e2-6c8a9f11d234",
    "translationKey": "vulnerability_process",
    "category": "vulnerability",
    "question": "製造商在「漏洞處理流程」中必須執行哪些關鍵步驟？",
    "answer": "漏洞處理流程涵蓋完整的生命週期管理：包含產出與維護 SBOM、追蹤漏洞並消除已知漏洞、立即處理新發現漏洞等。"
  },
  {
    "id": "6d2f3a88-1c94-4e2b-a5f1-3b7c8e90f456",
    "translationKey": "compliance_documents",
    "category": "label",
    "question": "在「資訊和標記」部分，製造商需要準備哪些合規檔案與聲明？",
    "answer": "資訊和標記要求包括 CE 標誌認證與歐盟符合性聲明 (DoC)、任命授權代表、技術文件（包含網路安全風險評估）與 SBOM 等。"
  },
  {
    "id": "9a4c5b12-3e81-4d6f-8c2a-1f9e7d6b3c89",
    "translationKey": "sbom_importance",
    "category": "vulnerability",
    "question": "為什麼 SBOM（軟體物料清單）在 CRA 漏洞處理中如此重要？",
    "answer": "SBOM 能夠協助製造商精確識別產品中包含的所有第三方與開源軟體依賴項，當漏洞爆發時能在最短時間內追蹤受影響範圍。"
  }
]
```
