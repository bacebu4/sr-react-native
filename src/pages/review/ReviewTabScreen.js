import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Card } from "../../Card";
import { Title } from "../../components/Title";
import { Tag } from "../../Tag";
import { Comment } from "../../Comment";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { UiStoreContext } from "../../store/UiStore";
import ActionSheet from "react-native-actionsheet";
import * as Haptics from "expo-haptics";
import { Container } from "../../components/grid/Container";
import { TagContainer } from "../../components/grid/TagContainer";
import { EditTextModal } from "../../components/EditTextModal";
import { useConfirm } from "../../hooks/confirm.hook";
import { useRequest } from "../../hooks/request.hook";
import { TagModal } from "../../components/TagModal";
import { ChooseScreen } from "../addTag/ChooseScreen";
import { TagConstructor } from "../addTag/TagConstructor";

export const ReviewTabScreen = observer(({ noteIndex, noteId = null }) => {
  const NotesStore = useContext(NotesStoreContext);
  const UiStore = useContext(UiStoreContext);
  const note = noteIndex
    ? NotesStore.highlights[noteIndex - 1]
    : NotesStore.currentNote;
  const actionTagRef = useRef(null);
  const actionAddRef = useRef(null);
  const [tagId, setTagId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTagVisible, setModalTagVisible] = useState(false);
  const [modalEditTagVisible, setModalEditTagVisible] = useState(false);
  const [text, setText] = useState("");
  const confirm = useConfirm();
  const { request } = useRequest();

  useEffect(() => {
    NotesStore.setCurrentNote(null);
    if (noteId) {
      fetchNote();
    }
  }, []);

  const fetchNote = useCallback(async () => {
    const fetched = await request(
      `/api/note/${noteId}`,
      "GET",
      NotesStore.token
    );
    NotesStore.setCurrentNote(fetched);
  }, []);

  const showAddTagStack = () => {
    setModalTagVisible(true);
    UiStore.setCurrentNote(note.note_id);
  };

  const handleLongAddPress = (tagId) => {
    setTagId(tagId);
    Haptics.selectionAsync();
    actionTagRef.current.show();
  };

  const handleDeleteTag = () => {
    confirm(
      () => {
        // NotesStore.deleteTagFromNote(note.note_id, tagId);
      },
      "Delete tag",
      "Are you sure you want to delete this tag from highlight?"
    );
  };

  const handleEditTag = () => {
    UiStore.setCurrentTag(tagId);
    setModalEditTagVisible(true);
  };

  const showAddCommentModal = () => {
    setText("");
    setModalVisible(true);
  };

  const handleSave = () => {
    setModalVisible(false);
    // NotesStore.addComment(note.note_id, text);
  };

  return (
    <>
      <EditTextModal
        title="New comment"
        modalState={modalVisible}
        setModalState={setModalVisible}
        text={text}
        onText={setText}
        handleSave={handleSave}
      ></EditTextModal>

      <TagModal
        modalState={modalEditTagVisible}
        setModalState={setModalEditTagVisible}
      >
        <TagConstructor
          handleBack={() => setModalEditTagVisible(false)}
          editMode
        ></TagConstructor>
      </TagModal>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!note ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <TagModal
              modalState={modalTagVisible}
              setModalState={setModalTagVisible}
            >
              <ChooseScreen
                handleCancel={() => setModalTagVisible(false)}
                note={note}
              ></ChooseScreen>
            </TagModal>

            <Container mt={32}>
              <Card note={note}></Card>
            </Container>

            <Container
              mt={16}
              style={{ opacity: note.deleted ? 0.3 : 1 }}
            ></Container>
            {note.comments.length ? (
              <>
                <Container
                  isRow
                  mt={32}
                  style={{ opacity: note.deleted ? 0.3 : 1 }}
                >
                  <Title title="Your comment:" type="small"></Title>
                  <TouchableOpacity
                    onPress={showAddCommentModal}
                    disabled={note.deleted}
                  >
                    <Image
                      style={styles.image}
                      source={require("../../assets/plus.png")}
                    ></Image>
                  </TouchableOpacity>
                </Container>

                {note.comments.map((comment) => {
                  return (
                    <Container
                      style={{ opacity: note.deleted ? 0.3 : 1 }}
                      mt={8}
                      mb={8}
                      key={comment.comment_id}
                    >
                      <Comment comment={comment}></Comment>
                    </Container>
                  );
                })}
              </>
            ) : (
              <View />
            )}

            <Container
              mt={32}
              mb={64}
              style={{ opacity: note.deleted ? 0.3 : 1 }}
            >
              {note.tags.length ? (
                <>
                  <View style={styles.line}>
                    <Title title="Your tags:" type="small"></Title>
                    <TouchableOpacity
                      onPress={showAddTagStack}
                      disabled={note.deleted}
                    >
                      <Image
                        style={styles.image}
                        source={require("../../assets/plus.png")}
                      ></Image>
                    </TouchableOpacity>
                  </View>

                  <TagContainer>
                    {note.tags.map((tag) => (
                      <Tag
                        hue={tag.hue}
                        key={tag.tag_id}
                        title={tag.tag_name}
                        onLongPress={() => handleLongAddPress(tag.tag_id)}
                        style={{ marginRight: 16, marginTop: 16 }}
                      ></Tag>
                    ))}
                  </TagContainer>
                </>
              ) : (
                <></>
              )}
              {note.tags.length && note.comments.length ? (
                <></>
              ) : (
                <Container isCentered mt={32}>
                  <TouchableOpacity
                    onPress={() => actionAddRef.current.show()}
                    disabled={note.deleted}
                  >
                    <Image
                      style={styles.imageBigger}
                      source={require("../../assets/bigPlus.png")}
                    ></Image>
                  </TouchableOpacity>
                </Container>
              )}
            </Container>
          </>
        )}
      </ScrollView>

      <ActionSheet
        ref={actionAddRef}
        title="What you want to add?"
        options={["Add comment", "Add tag", "Cancel"]}
        cancelButtonIndex={2}
        onPress={(index) => {
          if (index === 1) {
            showAddTagStack();
          } else if (index === 0) {
            showAddCommentModal();
          }
        }}
      />

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
    </>
  );
});

const styles = StyleSheet.create({
  mt: {
    marginTop: 32,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 24,
    height: 24,
  },
  imageBigger: {
    width: 40,
    height: 40,
    tintColor: "#B0AFAF",
  },
});
