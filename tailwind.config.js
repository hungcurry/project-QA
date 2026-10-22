/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./*.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        // 自訂主題顏色配置
        primary: {
          50: "#fef2f2",   // 對應原本的 red-50 (淺底色 / 提示底色)
          100: "#fee2e2",  // 對應原本的 red-100 (懸停或邊框色)
          600: "#FF0000",  // primary-對應原本的 red-600 (主按鈕、主圖示色)
          700: "#b91c1c",  // 對應原本的 red-700 (按鈕 hover 互動色)
        },
        dark: {
          500 : "#24292e", // 方塊色
          800: "#161618"   // 頁面底色
        },
      },
    },
  },
  plugins: [],
};
