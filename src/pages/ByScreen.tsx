import React from "react";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNotesByQuery } from "../generated/graphql";
import { Card } from "../components/CardNew";
import { HomeStackParamList } from "src/stacks/HomeStackScreen";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

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
