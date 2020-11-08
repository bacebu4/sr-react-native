import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card } from "../../Card";
import { Title } from "../../Title";
import { Tag } from "../../Tag";
import { Comment } from "../../Comment";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { UiStoreContext } from "../../store/UiStore";
import ActionSheet from "react-native-actionsheet";
import * as Haptics from "expo-haptics";
import { Container } from "../../components/grid/Container";
import { TagContainer } from "../../components/grid/TagContainer";

export const ReviewTabScreen = observer(({ noteIndex }) => {
  const NotesStore = useContext(NotesStoreContext);
  const UiStore = useContext(UiStoreContext);
  const note = NotesStore.highlights[noteIndex - 1];
  const actionTagRef = React.useRef(null);
  const [tagId, setTagId] = React.useState(null);

  // const showActionSheet = () => {
  //   actionAddRef.current.show();
  // };

  const showAddTagStack = () => {
    UiStore.addRef.current.snapTo(1);
    UiStore.setCurrentNote(noteIndex - 1);
    UiStore.setShowChooseSheet(true);
  };

  const handleLongAddPress = (tagId) => {
    setTagId(tagId);
    Haptics.selectionAsync();
    actionTagRef.current.show();
  };

  const handleDeleteTag = () => {
    NotesStore.deleteTagFromNote(noteIndex - 1, tagId);
  };

  const handleEditTag = () => {
    console.log("editing");
    UiStore.setShowEditSheet(true);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container mt={32}>
          <Card note={note}></Card>
        </Container>

        <Container mt={16} style={{ opacity: note.deleted ? 0.3 : 1 }}>
          {note.comment_text ? (
            <>
              <View style={styles.mt}>
                <Title title="Your comment:" type="small"></Title>
              </View>

              <Comment
                text={note.comment_text}
                disabled={note.deleted}
              ></Comment>
            </>
          ) : (
            <View></View>
          )}
        </Container>

        <Container mt={32} mb={64} style={{ opacity: note.deleted ? 0.3 : 1 }}>
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
            <>
              <Container center mt={32}>
                <TouchableOpacity
                  onPress={showAddTagStack}
                  disabled={note.deleted}
                >
                  <Image
                    style={styles.imageBigger}
                    source={require("../../assets/bigPlus.png")}
                  ></Image>
                </TouchableOpacity>
              </Container>
            </>
          )}
        </Container>
      </ScrollView>
      {/* TODO implement adding comments */}
      {/* <ActionSheet
        ref={actionAddRef}
        title="What you want to add?"
        options={["Add comment", "Add tag", "Cancel"]}
        cancelButtonIndex={2}
        onPress={}
      /> */}
      <ActionSheet
        ref={actionTagRef}
        title="You sure you want to delete the tag from the highlight?"
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
  },
});
