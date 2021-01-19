import React from "react";
import { ActivityIndicator, Image } from "react-native";
import { Container } from "./grid/Container";
import { TextGray } from "./TextGray";
import { useNavigation } from "@react-navigation/native";
import { Card } from "./CardNew";
import { MainButton } from "./MainButton";
import { useNoteQuery } from "../generated/graphql";

interface Props {
  noteId: string;
}

export const MainHighlight: React.FC<Props> = ({ noteId }) => {
  const [result] = useNoteQuery({ variables: { id: noteId } });
  const { data, fetching } = result;
  const navigation = useNavigation();

  if (!data?.note) {
    return (
      <Container mt={32} isCentered>
        <Image
          style={{ width: 186, height: 173 }}
          source={require("../assets/empty_main.png")}
        />

        <TextGray mt={32}>No highlights added yet</TextGray>

        <Container mt={32}>
          <MainButton title="Learn how to add" />
        </Container>
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
    <Container mt={32}>
      <Card note={data.note} />

      <Container mt={32} isCentered>
        <MainButton
          onPress={() => navigation.navigate("Review")}
          title="Start review"
        />
      </Container>
    </Container>
  );
};
