import React, { useContext, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Title } from "../../components/Title";
import { Tag } from "../../Tag";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../store/UiStore";
import ActionSheet from "react-native-actionsheet";
import * as Haptics from "expo-haptics";
import { Container } from "../../components/grid/Container";
import { TagContainer } from "../../components/grid/TagContainer";
import { useConfirm } from "../../hooks/confirm.hook";
import { TagModal } from "../../components/TagModal";
// @ts-ignore
import { ChooseScreen } from "../addTag/ChooseScreen";
// @ts-ignore
import { TagConstructor } from "../addTag/TagConstructor";
import { EditTextModal } from "../../components/EditTextModal";
import { useNoteQuery } from "../../generated/graphql";
import { TText } from "../../components/TText";
import { Card } from "../../components/CardNew";
import { Comment } from "../../components/CommentNew";

interface Props {
  noteId?: string;
  jumpTo?: (key: string) => void;
}

export const ReviewTabScreen: React.FC<Props> = observer(({ noteId = "" }) => {
  const UiStore = useContext(UiStoreContext);
  const actionTagRef = useRef(null);
  const actionAddRef = useRef(null);
  const [tagId, setTagId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTagVisible, setModalTagVisible] = useState(false);
  const [modalEditTagVisible, setModalEditTagVisible] = useState(false);
  const [text, setText] = useState("");
  const confirm = useConfirm();
  const [result] = useNoteQuery({ variables: { id: noteId } });
  const { data, fetching, error } = result;

  const showAddTagStack = () => {
    setModalTagVisible(true);
    UiStore.setCurrentNoteId(data!.note!.id);
  };

  const handleLongAddPress = (tagId: string) => {
    setTagId(tagId);
    Haptics.selectionAsync();
    // @ts-ignore
    actionTagRef!.current!.show();
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
    UiStore.setCurrentTagId(tagId!);
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

  if (fetching) {
    return (
      <Container isCentered mt={400}>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container isCentered mt={400}>
        <TText>{error.message}</TText>
      </Container>
    );
  }

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
        <>
          <TagModal
            modalState={modalTagVisible}
            setModalState={setModalTagVisible}
          >
            <ChooseScreen
              handleCancel={() => setModalTagVisible(false)}
              note={data?.note}
            ></ChooseScreen>
          </TagModal>

          <Container mt={32}>
            <Card note={data!.note!} />
          </Container>

          <Container
            mt={16}
            style={{
              opacity: data?.note?.deleted ? 0.3 : 1,
            }}
          />
          {data?.note?.comments.length ? (
            <>
              <Container
                isRow
                mt={32}
                style={{
                  opacity: data?.note?.deleted ? 0.3 : 1,
                }}
              >
                <Title title="Your comment:" type="small"></Title>
                <TouchableOpacity
                  onPress={showAddCommentModal}
                  disabled={data?.note?.deleted}
                >
                  <Image
                    style={styles.image}
                    source={require("../../assets/plus.png")}
                  ></Image>
                </TouchableOpacity>
              </Container>

              {data.note.comments.map((comment) => {
                return (
                  <Container
                    style={{
                      opacity: data?.note?.deleted ? 0.3 : 1,
                    }}
                    mt={8}
                    mb={8}
                    key={comment?.id}
                  >
                    <Comment comment={comment} />
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
            style={{
              opacity: data?.note?.deleted ? 0.3 : 1,
            }}
          >
            {data?.note?.tags?.length ? (
              <>
                <View style={styles.line}>
                  <Title title="Your tags:" type="small"></Title>
                  <TouchableOpacity
                    onPress={showAddTagStack}
                    disabled={data?.note?.deleted}
                  >
                    <Image
                      style={styles.image}
                      source={require("../../assets/plus.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>

                <TagContainer>
                  {data.note.tags.map((tag) => (
                    <Tag
                      hue={tag?.hue}
                      key={tag?.id}
                      title={tag?.name}
                      onLongPress={() => handleLongAddPress(tag!.id)}
                      style={{ marginRight: 16, marginTop: 16 }}
                    />
                  ))}
                </TagContainer>
              </>
            ) : (
              <></>
            )}
            {data?.note?.tags?.length && data?.note?.comments?.length ? (
              <></>
            ) : (
              /* when no comments and tags show big plus */
              <Container isCentered mt={32}>
                <TouchableOpacity
                  // @ts-ignore
                  onPress={() => actionAddRef.current.show()}
                  disabled={data?.note?.deleted}
                >
                  <Image
                    style={styles.imageBigger}
                    source={require("../../assets/bigPlus.png")}
                  />
                </TouchableOpacity>
              </Container>
            )}
          </Container>
        </>
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
