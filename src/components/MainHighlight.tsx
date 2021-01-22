import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "./grid/Container";
import { useNavigation } from "@react-navigation/native";
import { Card } from "./CardNew";
import { MainButton } from "./MainButton";
import { useNoteQuery } from "../generated/graphql";
import { BaseImage } from "./BaseImage";
import { BaseText } from "./BaseText";

interface Props {
  noteId: string;
}

export const MainHighlight: React.FC<Props> = ({ noteId }) => {
  const [result] = useNoteQuery({ variables: { id: noteId } });
  const { data, fetching } = result;
  const navigation = useNavigation();

  if (fetching) {
    return (
      <Container isCentered mt={400}>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  if (!data?.note) {
    return (
      <Container mt={32} isCentered>
        <BaseImage
          w={186}
          h={173}
          source={require("../assets/empty_main.png")}
        />

        <BaseText color="gray" fz={14} mt={32}>
          No highlights added yet
        </BaseText>

        <Container mt={32}>
          <MainButton title="Learn how to add" />
        </Container>
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
