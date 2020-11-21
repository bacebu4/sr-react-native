import React, { useContext, useRef, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { Card } from "../Card";
import { Navbar } from "../Navbar";
import { MainButton } from "../MainButton";
import { Title } from "../Title";
import { Carousel } from "../Carousel";
import { SeeAll } from "../SeeAll";
import { Tag } from "../Tag";
import { NotesStoreContext } from "../store/NotesStore";
import { observer } from "mobx-react-lite";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { TagContainer } from "../components/grid/TagContainer";
import { SettingsModal } from "../components/SettingsModal";
import ActionSheet from "react-native-actionsheet";
import * as Haptics from "expo-haptics";
import { UiStoreContext } from "../store/UiStore";
import { useConfirm } from "../hooks/confirm.hook";

export const HomeScreen = observer(({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const actionTagRef = useRef(null);
  const [tagId, setTagId] = useState(null);
  const UiStore = useContext(UiStoreContext);
  const NotesStore = useContext(NotesStoreContext);
  const confirm = useConfirm();

  const closeSettings = () => {
    setModalSettings(false);
  };

  const openSettings = () => {
    setModalSettings(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    NotesStore.fetchHighlights().then(() => setRefreshing(false));
  }, []);

  const handleLongAddPress = (tagId) => {
    setTagId(tagId);
    Haptics.selectionAsync();
    actionTagRef.current.show();
  };

  const handleEditTag = () => {
    UiStore.setShowEditSheet(true, tagId);
  };

  const handleDeleteTag = () => {
    confirm(
      () => {
        NotesStore.deleteTag(tagId);
      },
      "Delete the tag globally?",
      "Are you sure you want to delete the tag?"
    );
  };

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

          <Container mt={32}>
            {NotesStore.highlights.length ? (
              <>
                <Card note={NotesStore.highlights[0]} />

                <Container mt={32} center>
                  <MainButton
                    clickAction={() => navigation.navigate("Review")}
                  ></MainButton>
                </Container>
              </>
            ) : (
              <>
                <Container mt={32} center>
                  <Image
                    style={styles.image}
                    source={require("../assets/empty_main.png")}
                  ></Image>

                  <Text style={styles.text}>No highlights added yet</Text>

                  <Container mt={32}>
                    <MainButton
                      clickAction={() => navigation.navigate("Review")}
                      title="Learn how to add"
                    ></MainButton>
                  </Container>
                </Container>
              </>
            )}
          </Container>

          {/* Latest reads */}
          {NotesStore.latestBooks.length ? (
            <>
              <Container mt={32}>
                <Title title="Latest reads"></Title>
              </Container>

              <Carousel books={NotesStore.latestBooks.slice(0, 10)}></Carousel>
              <Container mt={16}></Container>
              {/* <Container mt={16}>
                <SeeAll></SeeAll>
              </Container> */}
            </>
          ) : (
            <>
              <View></View>
            </>
          )}

          {/* Review by tags */}
          {NotesStore.tags.length ? (
            <>
              <Container border></Container>
              <Container mt={44} mb={150}>
                <Title title="Review by tags"></Title>

                <TagContainer>
                  {NotesStore.tags.slice(0, 10).map((tag) => (
                    <Tag
                      hue={tag.hue}
                      key={tag.tag_id}
                      title={tag.tag_name}
                      style={{ marginRight: 16, marginTop: 16 }}
                      onLongPress={() => handleLongAddPress(tag.tag_id)}
                    ></Tag>
                  ))}
                </TagContainer>
              </Container>

              {/* <Container mt={16} mb={150} border></Container> */}

              {/* <Container mt={16} mb={150}>
                <SeeAll></SeeAll>
              </Container> */}
            </>
          ) : (
            <>
              <View></View>
            </>
          )}
        </ScrollView>

        <ActionSheet
          ref={actionTagRef}
          options={["Delete", "Edit", "Cancel"]}
          cancelButtonIndex={2}
          onPress={(index) => {
            if (index === 0) {
              handleDeleteTag();
            } else if (index === 1) {
              handleEditTag();
            }
          }}
          destructiveButtonIndex={0}
        />
      </MainContainer>
    </>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 186,
    height: 173,
  },
  text: {
    color: "#B0AFAF",
    marginTop: 32,
  },
});
