import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { HomeStackParamList } from "src/stacks/HomeStackScreen";
import { BaseImage } from "../components/BaseImage";
import { BaseText } from "../components/BaseText";
import { Card } from "../components/CardNew";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import { useNotesByQuery } from "../generated/graphql";

type Props = {
  route: RouteProp<HomeStackParamList, "By">;
  navigation: StackNavigationProp<HomeStackParamList, "By">;
};

export const ByScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, type } = route.params;
  const [result] = useNotesByQuery({ variables: { id, type } });
  const { data, fetching, error } = result;

  if (error) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <Text>{error.message}</Text>
        </Container>
      </MainContainer>
    );
  }

  if (fetching) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <ActivityIndicator size="large" />
        </Container>
      </MainContainer>
    );
  }

  if (!data?.notesBy?.length) {
    return (
      <MainContainer>
        <Container isCentered isCenteredY style={{ flex: 1 }}>
          <BaseImage
            source={require("../assets/empty_tags.png")}
            w={153}
            h={120}
          />

          <BaseText
            fz={16}
            mt={32}
            color="gray"
            style={{ textAlign: "center" }}
          >
            You don't have any highlights referred to this {type.toLowerCase()}
          </BaseText>
          <BaseText mt={16} isSerif isBold fz={18}>
            Do you want to delete it?
          </BaseText>
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <FlatList
        data={data?.notesBy}
        keyExtractor={(item) => item!.id}
        renderItem={({ item }) => (
          <Container mt={16} mb={16} key={item?.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Highlight", {
                  name: "Highlight",
                  noteId: item!.id,
                })
              }
            >
              <Card
                note={{
                  author: item!.author,
                  title: item!.title,
                  id: item!.id,
                  text: item!.text,
                }}
                dense={type === "Book"}
              />
            </TouchableOpacity>
          </Container>
        )}
      />
    </MainContainer>
  );
};
