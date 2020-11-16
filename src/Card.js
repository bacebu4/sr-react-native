import React, { useRef, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "./store/NotesStore";
import { EditTextModal } from "./components/EditTextModal";
import { useConfirm } from "./hooks/confirm.hook";
import { useMessage } from "./hooks/message.hook";

export const Card = observer(({ note, dense = false }) => {
  const actionSheetRef = useRef(null);
  const NotesStore = useContext(NotesStoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onText] = useState(note.note_text);
  const confirm = useConfirm();
  const message = useMessage();

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: note.note_text.replace(/\&nbsp;/g, " "),
      });
    } catch (error) {
      message(error.message);
    }
  };

  const onDelete = async () => {
    confirm(
      () => {
        NotesStore.deleteNote(note.note_id);
      },
      "Delete highlight",
      "Are you sure you want to delete this highlight?"
    );
  };

  const onEdit = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    setModalVisible(false);
    NotesStore.updateNote(note.note_id, text);
  };

  return (
    <>
      <EditTextModal
        modalState={modalVisible}
        setModalState={setModalVisible}
        title="Edit note"
        text={text}
        onText={onText}
        handleSave={handleSave}
      ></EditTextModal>

      <View style={{ ...styles.wrapper, opacity: note.deleted ? 0.3 : 1 }}>
        {dense ? (
          <></>
        ) : (
          <>
            <View style={styles.header}>
              <Image style={styles.cover} source={require("./cover.png")} />
              <View style={styles.info}>
                <View>
                  <Text style={styles.title}>{note?.book_title}</Text>
                </View>
                <View>
                  <Text style={styles.author}>{note?.author_full_name}</Text>
                </View>
              </View>
              <View style={styles.more}>
                <TouchableOpacity
                  onPress={() => showActionSheet()}
                  disabled={note.deleted}
                >
                  <Image
                    style={styles.moreIcon}
                    source={require("./dots.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <View style={{ marginTop: dense ? 0 : 16 }}>
          <Text style={styles.noteText}>
            {/* // TODO how safe it is? */}
            {note?.note_text.replace(/\&nbsp;/g, " ")}
          </Text>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          options={["Delete", "Edit", "Share", "Сancel"]}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          onPress={(index) => {
            if (index === 2) {
              onShare();
            } else if (index === 0) {
              onDelete();
            } else if (index === 1) {
              onEdit();
            }
          }}
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 32,
    backgroundColor: "white",
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 40,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#B0AFAF",
    shadowOffset: { height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  info: {
    marginLeft: 16,
    flexDirection: "column",
    marginRight: 64,
  },
  more: {
    marginLeft: "auto",
  },
  moreIcon: {
    width: 24,
    height: 22.2,
  },
  title: {
    fontSize: 22,
    color: "#343434",
    fontWeight: "bold",
    fontFamily: "Cochin",
    lineHeight: 22,
  },
  author: {
    fontSize: 18,
    fontFamily: "Cochin",
    color: "#B0AFAF",
    marginTop: 0,
  },
  noteText: {
    textAlign: "justify",
    fontSize: 17,
    color: "#343434",
    fontFamily: "Cochin",
  },
  menu: {
    marginLeft: 32,
  },
  cover: {
    borderRadius: 5,
  },
});
