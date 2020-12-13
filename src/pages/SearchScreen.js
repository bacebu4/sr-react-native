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
import { TextGray } from "../components/TextGray";

export const SearchScreen = observer(({ navigation }) => {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  const [hasSearched, setSearched] = useState(false);
  const NotesStore = useContext(NotesStoreContext);

  const handleSubmit = () => {
    if (search.trim()) {
      setSearched(true);
      setHistory([search, ...history]);
      if (history.length > 8) {
        setHistory(history.slice(0, 8));
      }
      NotesStore.searchNotes(search);
    }
  };

  const handleClear = () => {
    setSearched(false);
    NotesStore.setSearchResults([]);
  };

  const handleHistory = (pastSearch) => {
    setSearch(pastSearch);
    NotesStore.searchNotes(pastSearch);
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
          <Container isCentered mt={200}>
            <ActivityIndicator size="large" />
          </Container>
        </>
      ) : (
        <>
          {NotesStore.searchResults.length ? (
            <FlatList
              data={NotesStore.searchResults}
              keyExtractor={(item) => item.note_id}
              renderItem={({ item }) => (
                <Container mt={16} mb={16} key={item.note_id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Highlight", {
                        name: "Highlight",
                        note_id: item.note_id,
                      })
                    }
                  >
                    <Card note={item}></Card>
                  </TouchableOpacity>
                </Container>
              )}
            ></FlatList>
          ) : (
            <>
              {hasSearched ? (
                <Container isCentered mt={150}>
                  <Image
                    style={styles.image}
                    source={require("../assets/empty_search.png")}
                  ></Image>
                  <TextGray mt={32}>Nothing found</TextGray>
                </Container>
              ) : (
                <>
                  {history.length ? (
                    <>
                      <Container isRow>
                        <Text style={styles.textGrayCapital}>RECENT</Text>
                        <TouchableOpacity onPress={() => setHistory([])}>
                          <Text style={styles.textBlackCapital}>CLEAR</Text>
                        </TouchableOpacity>
                      </Container>
                      {history.map((h) => {
                        return (
                          <Container mt={16}>
                            <TouchableOpacity onPress={() => handleHistory(h)}>
                              <Title title={h} type="small"></Title>
                            </TouchableOpacity>
                          </Container>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <View />
                    </>
                  )}
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
  textGrayCapital: {
    color: "#B0AFAF",
    fontSize: 12,
    marginTop: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  textBlackCapital: {
    color: "#343434",
    fontSize: 12,
    marginTop: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
