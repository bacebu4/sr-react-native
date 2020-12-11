import React from "react";
import { Text } from "react-native";
import { useBooksQuery } from "src/generated/graphql";
//@ts-ignore
import { Container } from "../components/grid/Container";
//@ts-ignore
import { MainContainer } from "../components/grid/MainContainer";

export const AllBooksScreen = () => {
  const { data } = useBooksQuery()
  return (
    <MainContainer>
      <Container center mt={400} >
        <Text>All book are here</Text>
      </Container>
    </MainContainer>
  );
};
