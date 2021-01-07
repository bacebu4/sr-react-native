import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";

export const LoadingScreen: React.FC = () => {
  return (
    <MainContainer>
      <Container isCentered mt={400}>
        <ActivityIndicator size="large" />
      </Container>
    </MainContainer>
  );
};
