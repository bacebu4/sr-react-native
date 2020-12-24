import React from "react";
import { ActivityIndicator, Image, Text } from "react-native";
import { Container } from "./grid/Container";
import { TextGray } from "./TextGray";
// @ts-ignore
import { useNavigation } from "@react-navigation/native";
import { Card } from "./CardNew";
import { useDailyNotesQuery } from "../generated/graphql";
import { MainButton } from "../MainButton";
import { useTranslation } from "react-i18next";

export const MainHighlight: React.FC = () => {
  const [result] = useDailyNotesQuery();
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

  if (!data?.dailyNotes) {
    return (
      <Container mt={32} isCentered>
        <Image
          style={{ width: 186, height: 173 }}
          source={require("../assets/empty_main.png")}
        ></Image>

        <TextGray mt={32}>No highlights added yet</TextGray>

        <Container mt={32}>
          <MainButton title="Learn how to add"></MainButton>
        </Container>
      </Container>
    );
  }

  return (
    <>
      <Card note={data.dailyNotes[0]}></Card>

      <Container mt={32} isCentered>
        <MainButton
          onPress={() => navigation.navigate("Review")}
          title={t("Start review")}
        ></MainButton>
      </Container>
    </>
  );
};
