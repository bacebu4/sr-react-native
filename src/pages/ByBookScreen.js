import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { Card } from "../Card";
import { FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";

export const ByBookScreen = observer(({ route }) => {
  const NotesStore = useContext(NotesStoreContext);
  const { book_id } = route.params;

  useEffect(() => {
    NotesStore.getNotesByBook(book_id);
  }, []);

  return (
    <MainContainer>
      {NotesStore.notesByBookLoading ? (
        <>
          <Container center centerY style={{ flex: 1 }}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </Container>
        </>
      ) : (
        <>
          <FlatList
            data={NotesStore.notesByBook}
            keyExtractor={(item) => item.note_id}
            renderItem={({ item }) => (
              <Container mt={16} mb={16} key={item.note_id}>
                <TouchableOpacity>
                  <Card note={item}></Card>
                </TouchableOpacity>
              </Container>
            )}
          ></FlatList>
        </>
      )}
    </MainContainer>
  );
});
