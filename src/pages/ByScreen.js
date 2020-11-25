import React, { useContext, useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { Card } from "../Card";
import { FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import { useRequest } from "../hooks/request.hook";
import { useMessage } from "../hooks/message.hook";

export const ByScreen = observer(({ route, navigation }) => {
  const NotesStore = useContext(NotesStoreContext);
  const { id, type } = route.params;
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
        `/api/getNotesBy${type}`,
        "POST",
        NotesStore.token,
        { id }
      );
      setNotes(fetched);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainContainer>
      {loading ? (
        <Container center centerY style={{ flex: 1 }}>
          <ActivityIndicator size="large" />
        </Container>
      ) : (
        <FlatList
          data={notes}
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
                <Card note={item} dense={type === "Book"}></Card>
              </TouchableOpacity>
            </Container>
          )}
        ></FlatList>
      )}
    </MainContainer>
  );
});
