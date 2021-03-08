import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import {
  Info,
  Maybe,
  useReviewHistoryThisWeekQuery,
} from "../generated/graphql";
import { getWeekDaysArray } from "../utils/getWeekDaysArray";
import { BaseText } from "./BaseText";
import { Container } from "./grid/Container";
import { SingleDayCircle } from "./SingleDayCircle";

type WeekViewProps = {
  info:
    | Maybe<
        {
          __typename?: "Info" | undefined;
        } & Pick<
          Info,
          | "reviewAmount"
          | "email"
          | "latestReviewDate"
          | "streakBeginningDate"
          | "missed"
          | "reviewed"
          | "streak"
          | "id"
        >
      >
    | undefined;
};

export const WeekView: React.FC<WeekViewProps> = ({ info }) => {
  const [result] = useReviewHistoryThisWeekQuery();
  const { data, fetching, error } = result;

  if (error) {
    return (
      <Container isCentered mt={400}>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (fetching) {
    return (
      <Container isCentered mt={400}>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <Container mt={32} isRow style={{ justifyContent: "center" }}>
      {getWeekDaysArray(new Date()).map((day, index) => {
        return (
          <View
            key={day.dayOfTheMonth}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: index === 0 ? 0 : 16,
            }}
          >
            <BaseText color="gray" fz={12} isUppercase isBold>
              {day.name}
            </BaseText>
            <SingleDayCircle
              day={day}
              reviewHistoryThisWeek={data?.reviewHistoryThisWeek}
              reviewed={info?.reviewed}
            />
          </View>
        );
      })}
    </Container>
  );
};
