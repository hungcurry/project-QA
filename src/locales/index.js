import i18next from "i18next";

import zhTW from "./zh-tw.js";
import enUS from "./en-us.js";

export const SUPPORTED_LANGS = {
  "zh-TW": { label: "繁體中文", i18nKey: "index.langSelect.zh", showLogo: true },
  "en-US": { label: "English", i18nKey: "index.langSelect.en", showLogo: false },
  "ja-JP": { label: "日本語", i18nKey: "index.langSelect.ja", showLogo: false },
  "ko-KR": { label: "한국어", i18nKey: "index.langSelect.ko", showLogo: false },
};

function getInitialLanguage() {
  const savedLang = localStorage.getItem("CRA-lang");
  if (savedLang) return savedLang;

  const systemLang = navigator.language || navigator.userLanguage;
  return systemLang.startsWith("en") ? "en-US" : "zh-TW";
}

export async function initI18n() {
  const initialLng = getInitialLanguage();
  await i18next.init({
    lng: initialLng,
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
