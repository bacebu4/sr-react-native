import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Navbar } from "../Navbar";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { SettingsModal } from "../components/SettingsModal";
import { MainHighlight } from "../components/MainHighlight";
import { LatestBooks } from "../components/LatestBooks";
import { LatestTags } from "../components/LatestTags";

export const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);

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

          <MainHighlight />

          <LatestBooks />

          <LatestTags />
        </ScrollView>
      </MainContainer>
    </>
  );
};
