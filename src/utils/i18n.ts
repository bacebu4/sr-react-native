import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        "Start review": "Start review process",
        "Account preferences": "Account Preferences",
        Congrats: "Congratulations!",
        "Configure how much highlights you want to see on a daily basis":
          "Configure how much highlights you want to see on a daily basis. The changes will be applied the next day.",
        "You don't have any highlights referred to this ,tag":
          "You don't have any highlights referred to this tag",
        Dontforgetwhatyouread:
          "Don’t forget what you read. Review your notes daily!",
      },
    },
    ru: {
      translation: {
        "Start review": "Просмотреть все",
        "Account preferences": "Настройки",
        Done: "Готово",
        "Review Process Pending": "Просмотр сегодня",
        "Review mode": "Просмотр",
        Exit: "Выход",
        Save: "Сохранить",
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
        Edit: "Изм.",
        Cancel: "Отменить",
        Share: "Поделиться",
        "Latest books": "Недавние книги",
        "View by tags": "Обзор по тегам",
        "Remember what you read": "Помните, что вы читаете",
        "Sign up free": "Регистрация",
        "Already have an account?": "Уже есть аккаунт?",
        "All books": "Все книги",
        "All tags": "Все теги",
        "Highlights per day": "Заметок в день",
        "Configure how much highlights you want to see on a daily basis":
          "Настройте сколько заметок в день вы хотите видеть. Изменения вступят в силу на следующий день.",
        Language: "Язык",
        "Configure the language you want to see in the application":
          "Настройте какой язык вы хотите видеть в приложении",
        "Restart tutorial": "Перезапустить обучение",
        "Click this button if you want to see the tutorial all over again in case you miss something":
          "Нажмите на ссылку выше если вы хотите перепройти обучение",
        "Show terms and conditions": "Условия использования",
        "Show privacy policy": "Политика конфиденциальности",
        "Sign Out": "Выйти",
        "You've been on the track for": "Вы на верном пути",
        day: "день",
        days: "дней",
        "No tags created yet": "Вы пока не создали ни одного тега",
        "Nothing found": "Ничего не найдено",
        "Choose the action": "Выберите действие",
        "Delete the tag globally?": "Удалить тег везде?",
        "Are you sure you want to delete the tag?":
          "Вы уверены что хотите удалить этот тег?",
        "Do you want to delete it?": "Удалить?",
        "You don't have any highlights referred to this ,tag":
          "У вас нет ни одной заметки относящейся к этому тегу",
        "You don't have any highlights referred to this book":
          "У вас нет ни одной заметки относящейся к этой книге",
        Dontforgetwhatyouread:
          "Не забывайте, что вы прочитали. Просматривайте свою подборку ежедневно!",
        "Reviewing Goals": "Цели",
      },
    },
  },
});
export default i18n;
