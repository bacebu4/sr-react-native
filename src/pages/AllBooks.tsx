import React from "react";
import { Text } from "react-native";
//@ts-ignore
import { Container } from "../components/grid/Container";
//@ts-ignore
import { MainContainer } from "../components/grid/MainContainer";
import { useBooksQuery } from '../generated/graphql';

export const AllBooksScreen = () => {
  const [result] = useBooksQuery()
  const { data, fetching, error } = result;

  if (error) {
    return (
      <MainContainer>
      <Container center mt={400} >
        <Text>{error.message}</Text>
      </Container>
    </MainContainer>
    )
  }

  if (fetching) {
    return (
      <MainContainer>
      <Container center mt={400} >
        <Text>Loading...</Text>
      </Container>
    </MainContainer>
    )
  }

  if (!data?.books) {
    return (
      <MainContainer>
      <Container center mt={400} >
        <Text>No books</Text>
      </Container>
    </MainContainer>
    )
  }

  return (
    <MainContainer>
      <Container center mt={400} >
        <Text>{data?.books?.map(b => b?.title)}</Text>
      </Container>
    </MainContainer>
  );
};
