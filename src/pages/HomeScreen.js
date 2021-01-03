import React, { useContext, useRef, useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { Navbar } from "../Navbar";
import { Title } from "../components/Title";
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
import { MainHighlight } from "../components/MainHighlight";
import { LatestBooks } from "../components/LatestBooks";

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
          handleBack={() => setModalEditTagVisible(false)}
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

          <MainHighlight />

          <LatestBooks />

          {/* Review by tags */}
          {NotesStore.tags.length ? (
            <>
              <Container mt={44} mb={150}>
                <Title title="View by tags"></Title>

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
