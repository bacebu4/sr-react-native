import React, { useContext, useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { Card } from "../Card";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import { useRequest } from "../hooks/request.hook";
import { useMessage } from "../hooks/message.hook";

export const ByBookScreen = observer(({ route }) => {
  const NotesStore = useContext(NotesStoreContext);
  const { book_id } = route.params;
  const { request, loading, error, clearError } = useRequest();
  const [notes, setNotes] = useState([]);
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const fetchNotes = useCallback(async () => {
    try {
      const fetched = await request(
        `http://192.168.1.70:3000/api/getNotesByBook`,
        "POST",
        NotesStore.token,
        { book_id }
      );
      setNotes(fetched);
      console.log(notes);
    } catch (error) {}
  }, []);

  useEffect(() => {
    // NotesStore.getNotesByBook(book_id);
    fetchNotes();
  }, []);

  return (
    <MainContainer>
      {loading ? (
        <>
          <Container center centerY style={{ flex: 1 }}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </Container>
        </>
      ) : (
        <>
          <FlatList
            data={notes}
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
