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
        Congrats: "Congratulations!",
        Home: "Home",
        Search: "Search",
        "Goal achieved": "Goal achieved",
        "See All": "See All",
        "Today's Review": "Today's Review",
        Delete: "Delete",
        Edit: "Edit",
        Cancel: "Cancel",
        Share: "Share",
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
        "more left": "осталось",
        Congrats: "Поздравляем!",
        Home: "Главная",
        Search: "Поиск",
        "Goal achieved": "Цель достигнута",
        "See All": "Просмотреть все",
        "Today's Review": "Обзор на сегодня",
        "Go home": "На главную",
        Delete: "Удалить",
        Edit: "Редактировать",
        Cancel: "Отменить",
        Share: "Поделиться",
        "Latest books": "Недавние книги",
        "View by tags": "Обзор по тегам",
      },
    },
  },
});
export default i18n;
