import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Maybe, Tag } from "../generated/graphql";
import { Container } from "./grid/Container";
import { SeeAll } from "./SeeAll";
import { Tags } from "./Tags";
import { Title } from "./Title";

type LatestTagsProps = {
  tags:
    | Maybe<
        Maybe<
          {
            __typename?: "Tag" | undefined;
          } & Pick<Tag, "id" | "name" | "hue">
        >[]
      >
    | undefined;
};

export const LatestTags: React.FC<LatestTagsProps> = ({ tags }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  if (!tags?.length) {
    return <View />;
  }

  return (
    <>
      <Container mt={44} hasBorder pb={16}>
        <Title title={t("View by tags")} />

        <Tags tags={tags} />
      </Container>

      <Container mt={16}>
        <SeeAll onPress={() => navigation.navigate("AllTags")} />
      </Container>
    </>
  );
};
