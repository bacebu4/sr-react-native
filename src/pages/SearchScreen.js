import React, { useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import Constants from "expo-constants";
import { Title } from "../Title";
import { SearchBar } from "react-native-elements";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";

export const SearchScreen = observer(() => {
  const [search, setSearch] = useState("");
  const NotesStore = useContext(NotesStoreContext);

  return (
    <MainContainer>
      <ScrollView>
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
              color: "#343434",
              buttonStyle: {
                marginLeft: 4,
              },
            }}
            onSubmitEditing={() => NotesStore.searchNotes(search)}
          />
        </Container>
      </ScrollView>
    </MainContainer>
  );
});
