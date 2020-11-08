import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import Constants from "expo-constants";
import { Title } from "../Title";
import { SearchBar } from "react-native-elements";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";
import { Card } from "../Card";

export const SearchScreen = observer(() => {
  const [search, setSearch] = useState("");
  const [hasSearched, setSearched] = useState(false);
  const NotesStore = useContext(NotesStoreContext);

  const handleSubmit = () => {
    setSearched(true);
    NotesStore.searchNotes(search);
  };

  const handleClear = () => {
    setSearched(false);
    NotesStore.setSearchResults([]);
  };

  return (
    <MainContainer>
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
          onSubmitEditing={handleSubmit}
          onClear={handleClear}
        />
      </Container>

      {NotesStore.isSearching ? (
        <>
          <Container center mt={200}>
            <ActivityIndicator size="large" />
          </Container>
        </>
      ) : (
        <>
          {NotesStore.searchResults.length ? (
            <>
              <FlatList
                data={NotesStore.searchResults}
                keyExtractor={(item) => item.note_id}
                renderItem={({ item }) => (
                  <Container mt={32}>
                    <TouchableOpacity>
                      <Card note={item}></Card>
                    </TouchableOpacity>
                  </Container>
                )}
              ></FlatList>
            </>
          ) : (
            <>
              {hasSearched ? (
                <>
                  <Container center mt={200}>
                    <Image
                      style={styles.image}
                      source={require("../assets/empty_search.png")}
                    ></Image>
                    <Text style={styles.text}>Nothing found</Text>
                  </Container>
                </>
              ) : (
                <>
                  <View></View>
                </>
              )}
            </>
          )}
        </>
      )}
    </MainContainer>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 190,
    height: 213,
  },
  text: {
    color: "#B0AFAF",
    marginTop: 32,
  },
});
