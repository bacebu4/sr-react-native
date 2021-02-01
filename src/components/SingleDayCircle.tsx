import React from "react";
import { Day } from "../utils/getWeekDaysArray";
import { View } from "react-native";
import { BaseText } from "./BaseText";
import { isFuture, isSameDay, isToday } from "date-fns";
import { BLACK_COLOR, GRAY_COLOR } from "../utils/colors";
import { Maybe } from "src/generated/graphql";

interface SingleDayCircleProps {
  day: Day;
  reviewHistoryThisWeek: Maybe<string>[] | null | undefined;
  reviewed: boolean | undefined;
}

function backgroundColorSwitcher(
  date: Date,
  reviewed: boolean | undefined,
  reviewHistoryThisWeek: Maybe<string>[] | null | undefined
) {
  if (isFuture(date)) {
    return "white";
  }

  if (isToday(date) && !reviewed) {
    return "white";
  }

  if (isToday(date) && reviewed) {
    return BLACK_COLOR;
  }

  let isReviewed = false;
  reviewHistoryThisWeek?.forEach((d) => {
    if (isSameDay(new Date(d!), date)) {
      isReviewed = true;
    }
  });

  if (isReviewed) {
    return BLACK_COLOR;
  }

  return GRAY_COLOR;
}

function colorSwitcher(date: Date, reviewed: boolean | undefined) {
  if (isFuture(date)) {
    return "gray";
  }

  if (isToday(date) && !reviewed) {
    return undefined;
  }

  return "white";
}

function borderColorSwitcher(
  date: Date,
  reviewed: boolean | undefined,
  reviewHistoryThisWeek: Maybe<string>[] | null | undefined
) {
  if (isToday(date)) {
    return BLACK_COLOR;
  }

  let isReviewed = false;
  reviewHistoryThisWeek?.forEach((d) => {
    if (isSameDay(new Date(d!), date)) {
      isReviewed = true;
    }
  });

  if (isReviewed) {
    return BLACK_COLOR;
  }

  return GRAY_COLOR;
}

export const SingleDayCircle: React.FC<SingleDayCircleProps> = ({
  day,
  reviewHistoryThisWeek,
  reviewed,
}) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColorSwitcher(
          day.date,
          reviewed,
          reviewHistoryThisWeek
        ),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        height: 35,
        width: 35,
        marginTop: 8,
        borderColor: borderColorSwitcher(
          day.date,
          reviewed,
          reviewHistoryThisWeek
        ),
        borderWidth: 2,
      }}
    >
      <BaseText color={colorSwitcher(day.date, reviewed)} isSerif isBold>
        {day.dayOfTheMonth}
      </BaseText>
    </View>
  );
};
