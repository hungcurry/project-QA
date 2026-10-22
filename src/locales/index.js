import i18next from "i18next";

import zhTW from "./zh-tw.js";
import enUS from "./en-us.js";

async function initI18n() {
  await i18next.init({
    lng: "zh-TW",
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

export default initI18n;
