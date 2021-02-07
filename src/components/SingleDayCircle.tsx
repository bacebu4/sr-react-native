import React from "react";
import { Day } from "../utils/getWeekDaysArray";
import { View, ViewStyle } from "react-native";
import { BaseText } from "./BaseText";
import { isFuture, isSameDay, isToday } from "date-fns";
import { BLACK_COLOR, GRAY_COLOR } from "../utils/colors";

interface SingleDayCircleProps {
  day: Day;
  reviewHistoryThisWeek: any[] | null | undefined;
  reviewed: boolean | undefined;
}

function stylesSwitcher(props: SingleDayCircleProps): ViewStyle {
  if (isFuture(props.day.date)) {
    return {
      backgroundColor: "white",
      borderColor: GRAY_COLOR,
    };
  }

  if (isToday(props.day.date) && !props.reviewed) {
    return {
      backgroundColor: "white",
      borderColor: BLACK_COLOR,
    };
  }

  if (isToday(props.day.date) && props.reviewed) {
    return {
      backgroundColor: BLACK_COLOR,
      borderColor: BLACK_COLOR,
    };
  }

  let isReviewed = false;
  props.reviewHistoryThisWeek?.forEach((d) => {
    if (isSameDay(d!, props.day.date)) {
      isReviewed = true;
    }
  });

  if (isReviewed) {
    return {
      backgroundColor: BLACK_COLOR,
      borderColor: BLACK_COLOR,
    };
  }

  return {
    backgroundColor: GRAY_COLOR,
    borderColor: GRAY_COLOR,
  };
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

export const SingleDayCircle: React.FC<SingleDayCircleProps> = (props) => {
  console.log(props.reviewHistoryThisWeek?.length);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        height: 30,
        width: 30,
        marginTop: 8,
        borderWidth: 2,
        ...stylesSwitcher(props),
      }}
    >
      <BaseText
        color={colorSwitcher(props.day.date, props.reviewed)}
        isSerif
        isBold
      >
        {props.day.dayOfTheMonth}
      </BaseText>
    </View>
  );
};
