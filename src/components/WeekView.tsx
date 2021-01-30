import React, { useEffect } from "react";
import { Container } from "./grid/Container";
import { ActivityIndicator, Text } from "react-native";
import { useReviewHistoryThisWeekQuery } from "../generated/graphql";

export const WeekView: React.FC = () => {
  const [result] = useReviewHistoryThisWeekQuery();
  const { data, fetching, error } = result;

  useEffect(() => {
    console.log(data);
  }, [data]);

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
    <Container mt={16}>
      <Text>{JSON.stringify(data)}</Text>
    </Container>
  );
};
