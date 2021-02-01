import { startOfWeek, addDays, getDate, getDay } from "date-fns";

function getDayName(dayOfWeek: number): DayOfWeek {
  switch (dayOfWeek) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      throw new Error("");
  }
}

type DayOfWeek = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export interface Day {
  dayOfTheMonth: number;
  name: DayOfWeek;
  date: Date;
}

export function getWeekDaysArray(date: Date): Array<Day> {
  const weekDatesArray: Array<Day> = [];
  const startOfWeekDate = startOfWeek(date);

  for (let i = 1; i < 8; ++i) {
    const dayOfWeek = addDays(startOfWeekDate, i);
    const dayOfWeekNumber = getDay(dayOfWeek);
    const dayOfTheMonth = getDate(dayOfWeek);
    const dayName = getDayName(dayOfWeekNumber);
    weekDatesArray.push({ dayOfTheMonth, name: dayName, date: dayOfWeek });
  }

  return weekDatesArray;
}
