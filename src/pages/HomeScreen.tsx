import React, { useState } from "react";
import {
  ScrollView,
  RefreshControl,
  Text,
  ActivityIndicator,
} from "react-native";
// @ts-ignore
import { Navbar } from "../Navbar";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { SettingsModal } from "../components/SettingsModal";
import { MainHighlight } from "../components/MainHighlight";
import { LatestBooks } from "../components/LatestBooks";
import { LatestTags } from "../components/LatestTags";
import { useDailyNotesIdsQuery } from "../generated/graphql";

export const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [result] = useDailyNotesIdsQuery();
  const { data, fetching, error } = result;

  const closeSettings = () => {
    setModalSettings(false);
  };

  const openSettings = () => {
    setModalSettings(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    // NotesStore.fetchHighlights().then(() => setRefreshing(false));
  }, []);

  if (error) {
    return (
      <Container isCentered mt={400}>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (fetching) {
    return (
      <Container isCentered mt={400}>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <>
      <SettingsModal
        modalState={modalSettings}
        setModalState={setModalSettings}
        handleDone={closeSettings}
      ></SettingsModal>

      <MainContainer>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Container>
            <Navbar title="Book stash" handleClick={openSettings}></Navbar>
          </Container>

          <MainHighlight noteId={data?.dailyNotesIds![0]!} />

          <LatestBooks />

          <LatestTags />
        </ScrollView>
      </MainContainer>
    </>
  );
};
