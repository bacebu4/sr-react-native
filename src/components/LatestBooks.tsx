import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Container } from "./grid/Container";
import { useNavigation } from "@react-navigation/native";
import { useLatestBooksQuery } from "../generated/graphql";
import { Title } from "./Title";
import { SeeAll } from "./SeeAll";
import { Carousel } from "./CarouselNew";
import { useTranslation } from "react-i18next";

export const LatestBooks: React.FC = () => {
  const [result] = useLatestBooksQuery();
  const { data, fetching, error } = result;
  const navigation = useNavigation();
  const { t } = useTranslation();

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

  if (data?.latestBooks) {
    return (
      <>
        <Container mt={32}>
          <Title title={t("Latest books")}></Title>
        </Container>

        <Carousel books={data?.latestBooks}></Carousel>
        <Container mt={16} hasBorder></Container>
        <Container mt={16}>
          <SeeAll onPress={() => navigation.navigate("AllBooks")} />
        </Container>
      </>
    );
  }

  return <View />;
};
