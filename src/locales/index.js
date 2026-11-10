import i18next from "i18next";

import zhTW from "./zh-tw.js";
import enUS from "./en-us.js";

export async function initI18n() {
  await i18next.init({
    lng: localStorage.getItem("lang") || "zh-TW",
    fallbackLng: "zh-TW",

    resources: {
      "zh-TW": {
        translation: zhTW,
      },
      "en-US": {
        translation: enUS,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return i18next;
}

// 💡 關鍵：直接預設匯出 i18next 實例，
// 這樣其他檔案 import 時才能用 .t()
export default i18next;
