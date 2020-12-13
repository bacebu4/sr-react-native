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
import { Title } from "../components/Title";
import { Carousel } from "../Carousel";
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
import { TagModal } from "../components/TagModal";
import { TagConstructor } from "./addTag/TagConstructor";
import { TextGray } from "../components/TextGray";
import { SeeAll } from "../components/SeeAll";

export const HomeScreen = observer(({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [modalEditTagVisible, setModalEditTagVisible] = useState(false);
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
    UiStore.setCurrentTag(tagId);
    setModalEditTagVisible(true);
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

      <TagModal
        modalState={modalEditTagVisible}
        setModalState={setModalEditTagVisible}
      >
        <TagConstructor
          handleClose={() => setModalEditTagVisible(false)}
          editMode
        ></TagConstructor>
      </TagModal>

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

                <Container mt={32} isCentered>
                  <MainButton
                    onPress={() => navigation.navigate("Review")}
                  ></MainButton>
                </Container>
              </>
            ) : (
              <Container mt={32} isCentered>
                <Image
                  style={styles.image}
                  source={require("../assets/empty_main.png")}
                ></Image>

                <TextGray mt={32}>No highlights added yet</TextGray>

                <Container mt={32}>
                  <MainButton title="Learn how to add"></MainButton>
                </Container>
              </Container>
            )}
          </Container>

          {/* Latest reads */}
          {NotesStore.latestBooks.length ? (
            <>
              <Container mt={32}>
                <Title title="Latest reads"></Title>
              </Container>

              <Carousel books={NotesStore.latestBooks.slice(0, 10)}></Carousel>
              <Container mt={16} hasBorder></Container>
              <Container mt={16}>
                <SeeAll onPress={() => navigation.navigate("AllBooks")} />
              </Container>
            </>
          ) : (
            <View />
          )}

          {/* Review by tags */}
          {NotesStore.tags.length ? (
            <>
              {/* <Container border></Container> */}
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
                      clickAction={() =>
                        navigation.navigate("By", {
                          id: tag.tag_id,
                          name: tag.tag_name,
                          type: "Tag",
                        })
                      }
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
            <View />
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
});
