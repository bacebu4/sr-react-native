import React from "react";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import { Tags } from "../components/Tags";
import { useAllTagsScreenQuery } from "../generated/graphql";
import gql from "graphql-tag";
import { ActivityIndicator, Text } from "react-native";

export const ALL_TAGS_SCREEN_QUERY = gql`
  query AllTagsScreen {
    tags {
      id
      name
      hue
    }
  }
`;

export const AllTagsScreen: React.FC = () => {
  const [{ data, error, fetching }] = useAllTagsScreenQuery();

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
    <MainContainer>
      <Container>
        <Tags tags={data?.tags} />
      </Container>
    </MainContainer>
  );
};
