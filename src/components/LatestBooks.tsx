import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Book, Maybe } from "../generated/graphql";
import { Carousel } from "./Carousel";
import { Container } from "./grid/Container";
import { SeeAll } from "./SeeAll";
import { Title } from "./Title";

type LatestBooksProps = {
  latestBooks:
    | Maybe<
        Maybe<
          {
            __typename?: "Book" | undefined;
          } & Pick<Book, "id" | "title" | "author">
        >[]
      >
    | undefined;
};

export const LatestBooks: React.FC<LatestBooksProps> = ({ latestBooks }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  if (latestBooks?.length) {
    return (
      <>
        <Container mt={32}>
          <Title title={t("Latest books")}></Title>
        </Container>

        <Carousel books={latestBooks} />
        <Container mt={16} hasBorder />
        <Container mt={16}>
          <SeeAll onPress={() => navigation.navigate("AllBooks")} />
        </Container>
      </>
    );
  }

  return <View />;
};
