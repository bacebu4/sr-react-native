import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Container } from "./grid/Container";
import { useNavigation } from "@react-navigation/native";
import { Title } from "./Title";
import { useTranslation } from "react-i18next";
import { useLatestTagsQuery } from "../generated/graphql";
import { TagModal } from "./TagModal";
import { TagConstructor } from "../pages/addTag/TagConstructor";
import { SeeAll } from "./SeeAll";
import { Tags } from "./Tags";

export const LatestTags: React.FC = () => {
  const [result] = useLatestTagsQuery();
  const { data, fetching, error } = result;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [modalEditTagVisible, setModalEditTagVisible] = useState(false);

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

  if (!data?.latestTags?.length) {
    return <View />;
  }

  return (
    <>
      <TagModal
        modalState={modalEditTagVisible}
        setModalState={setModalEditTagVisible}
      >
        <TagConstructor
          handleBack={() => setModalEditTagVisible(false)}
          editMode
        />
      </TagModal>

      <Container mt={44}>
        <Title title={t("View by tags")} />

        <Tags type="latest" />
      </Container>

      <Container mt={16} hasBorder />
      <Container mt={16} mb={96}>
        <SeeAll onPress={() => navigation.navigate("AllTags")} />
      </Container>
    </>
  );
};
