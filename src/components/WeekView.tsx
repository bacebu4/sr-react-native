import React from "react";
import { Container } from "./grid/Container";
import { ActivityIndicator, Text, View } from "react-native";
import {
  useReviewHistoryThisWeekQuery,
  useInfoQuery,
} from "../generated/graphql";
import { getWeekDaysArray } from "../utils/getWeekDaysArray";
import { BaseText } from "./BaseText";
import { SingleDayCircle } from "./SingleDayCircle";

export const WeekView: React.FC = () => {
  const [result] = useReviewHistoryThisWeekQuery();
  const { data, fetching, error } = result;
  const [infoResult] = useInfoQuery();

  if (error) {
    return (
      <Container isCentered mt={400}>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (fetching || infoResult.fetching) {
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
              reviewed={infoResult.data?.info?.reviewed}
            />
          </View>
        );
      })}
    </Container>
  );
};
