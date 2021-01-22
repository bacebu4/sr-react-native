import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import Constants from "expo-constants";
import { Title } from "../components/Title";
import { SearchBar } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "src/stacks/SearchStackScreen";
import { useSearchNotesMutation } from "../generated/graphql";
import { Card } from "../components/CardNew";
import { BaseImage } from "../components/BaseImage";
import { BLACK_COLOR } from "../utils/colors";
import { BaseText } from "../components/BaseText";

type Props = {
  navigation: StackNavigationProp<SearchStackParamList, "Search">;
};

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [searchNotesResult, searchNotes] = useSearchNotesMutation();

  const handleSubmit = async () => {
    if (search.trim()) {
      setHistory([search, ...history]);
      if (history.length > 8) {
        setHistory(history.slice(0, 8));
      }
      await searchNotes({ substring: search });
    }
  };

  const handleClear = () => {
    searchNotesResult.data!.searchNotes = null;
  };

  const handleHistory = async (pastSearch: string) => {
    setSearch(pastSearch);
    await searchNotes({ substring: pastSearch });
  };

  const Header = (
    <Container mt={Constants.statusBarHeight + 40}>
      <Title type="big" title="Search" />
      <SearchBar
        placeholder="Highlights"
        onChangeText={setSearch}
        value={search}
        platform="ios"
        inputContainerStyle={{
          height: 35,
          marginLeft: 0,
          backgroundColor: "#eee",
        }}
        cancelButtonProps={{
          color: BLACK_COLOR,
          buttonStyle: {
            marginLeft: 4,
          },
        }}
        onSubmitEditing={handleSubmit}
        onClear={handleClear}
      />
    </Container>
  );

  if (searchNotesResult.fetching) {
    return (
      <MainContainer>
        {Header}
        <Container isCentered mt={200}>
          <ActivityIndicator size="large" />
        </Container>
      </MainContainer>
    );
  }

  if (searchNotesResult.data?.searchNotes?.length) {
    return (
      <MainContainer>
        {Header}
        <FlatList
          data={searchNotesResult.data.searchNotes}
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
                <Card note={item} />
              </TouchableOpacity>
            </Container>
          )}
        />
      </MainContainer>
    );
  }

  if (searchNotesResult.data?.searchNotes?.length === 0) {
    return (
      <MainContainer>
        {Header}
        <Container isCentered mt={150}>
          <BaseImage
            w={190}
            h={213}
            source={require("../assets/empty_search.png")}
          />
          <BaseText color="gray" fz={14} mt={32}>
            Nothing found
          </BaseText>
        </Container>
      </MainContainer>
    );
  }

  if (history.length) {
    return (
      <MainContainer>
        {Header}
        <Container isRow>
          <BaseText
            color="gray"
            fz={12}
            mt={16}
            isBold
            style={{ letterSpacing: 0.5 }}
          >
            RECENT
          </BaseText>
          <TouchableOpacity onPress={() => setHistory([])}>
            <BaseText fz={12} mt={16} isBold style={{ letterSpacing: 0.5 }}>
              CLEAR
            </BaseText>
          </TouchableOpacity>
        </Container>
        {history.map((h) => {
          return (
            <Container mt={16}>
              <TouchableOpacity onPress={() => handleHistory(h)}>
                <Title title={h} type="small" />
              </TouchableOpacity>
            </Container>
          );
        })}
      </MainContainer>
    );
  }

  return <MainContainer>{Header}</MainContainer>;
};
