import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { Card } from "../Card";
import { ScrollView } from "react-native";

export const ByBookScreen = observer(({ navigation }) => {
  const NotesStore = useContext(NotesStoreContext);

  return (
    <MainContainer>
      <ScrollView>
        <Container mt={16}></Container>
        <Container mt={16} mb={16}>
          <Card note={NotesStore.highlights[0]}></Card>
        </Container>
      </ScrollView>
    </MainContainer>
  );
});
