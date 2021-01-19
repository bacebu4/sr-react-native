import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import { useBooksQuery } from "../generated/graphql";

export const AllBooksScreen: React.FC = () => {
  const [result] = useBooksQuery();
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

  if (!data?.books) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <Text>No books</Text>
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Container isCentered mt={400}>
        <Text>{data?.books?.map((b) => b?.title)}</Text>
      </Container>
    </MainContainer>
  );
};
