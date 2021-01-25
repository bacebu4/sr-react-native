import React from "react";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import { Tags } from "../components/Tags";

export const AllTagsScreen: React.FC = () => {
  return (
    <MainContainer>
      <Container>
        <Tags />
      </Container>
    </MainContainer>
  );
};
