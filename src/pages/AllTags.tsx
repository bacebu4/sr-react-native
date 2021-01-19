import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import { useTagsQuery } from "../generated/graphql";

export const AllTagsScreen: React.FC = () => {
  const [result] = useTagsQuery();
  const { data, fetching, error } = result;

  if (error) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <Text>{error.message}</Text>
        </Container>
      </MainContainer>
    );
  }

  if (fetching) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <ActivityIndicator size="large" />
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Container isCentered mt={400}>
        <Text>{data?.tags?.map((t) => t?.name)}</Text>
      </Container>
    </MainContainer>
  );
};
