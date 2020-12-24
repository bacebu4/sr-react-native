import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        "Start review": "Start review process",
        "Account preferences": "Account Preferences",
        Done: "Done",
        "Review Process Pending": "Review Process Pending",
        "Review mode": "Review mode",
        Exit: "Exit",
        "Review Process": "Review Process",
        "more left": "more left",
      },
    },
    ru: {
      translation: {
        "Start review": "Просмотреть все",
        "Account preferences": "Настройки",
        Done: "Готово",
        "Review Process Pending": "Ожидается что-то",
        "Review mode": "Просмотр",
        Exit: "Выход",
        "Review Process": "В процессе",
        "more left": "осталось всего",
      },
    },
  },
});
export default i18n;
