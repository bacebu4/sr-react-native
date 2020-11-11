import React, { useRef, useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "./store/NotesStore";
import { MainContainer } from "./components/grid/MainContainer";
import { Container } from "./components/grid/Container";
import { NavbarTop } from "./components/NavbarTop";

const TextSheet = ({ handleCancel }) => {
  const input = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      input.current.focus();
    }, 100);
  }, []);

  return (
    <MainContainer>
      <Container>
        <NavbarTop
          handleClick={handleCancel}
          handleNext={handleCancel}
          title="Edit note"
          titleLeft="Cancel"
          titleRight="Save"
          noMargin
        ></NavbarTop>
      </Container>
      <Container border mt={16}></Container>
      <Container mt={16}>
        <TextInput ref={input} multiline style={{ fontSize: 16 }}></TextInput>
      </Container>
    </MainContainer>
  );
};

export const Card = observer(({ note }) => {
  const actionSheetRef = useRef(null);
  const NotesStore = useContext(NotesStoreContext);
  const [modalVisible, setModalVisible] = useState(false);

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: note.note_text.replace(/\&nbsp;/g, " "),
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onDelete = async () => {
    NotesStore.deleteNote(note.note_id);
  };

  const onEdit = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        presentationStyle="formSheet"
      >
        <TextSheet handleCancel={() => setModalVisible(false)}></TextSheet>
      </Modal>
      <View style={{ ...styles.wrapper, opacity: note.deleted ? 0.3 : 1 }}>
        <View style={styles.header}>
          <View style={styles.cover}>
            <Image style={styles.icon} source={require("./cover.png")} />
          </View>
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
              <Image style={styles.moreIcon} source={require("./dots.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.note}>
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
  note: {
    marginTop: 16,
  },
  menu: {
    marginLeft: 32,
  },
});
