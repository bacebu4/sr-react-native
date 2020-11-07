import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import Constants from "expo-constants";
import { Title } from "../Title";

export const SearchScreen = () => {
  return (
    <MainContainer>
      <ScrollView>
        <Container mt={Constants.statusBarHeight + 40}>
          <Title type="big" title="Search" />
        </Container>
      </ScrollView>
    </MainContainer>
  );
};
