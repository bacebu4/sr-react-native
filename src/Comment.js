import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { EditTextModal } from "./components/EditTextModal";

export const Comment = ({ text, disabled = false }) => {
  const actionSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [textToModal, setTextToModal] = useState(text);

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const onEdit = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    setModalVisible(false);
    console.log("worked");
  };

  return (
    <>
      <EditTextModal
        modalState={modalVisible}
        setModalState={setModalVisible}
        title="Edit comment"
        text={textToModal}
        onText={setTextToModal}
        handleSave={handleSave}
      ></EditTextModal>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View>
            <Text style={styles.date}>2020-10-25</Text>
          </View>
          <View style={styles.more}>
            <TouchableOpacity onPress={showActionSheet} disabled={disabled}>
              <Image style={styles.moreIcon} source={require("./dots.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.note}>
          <Text style={styles.noteText}>{text}</Text>
        </View>
        <ActionSheet
          style={styles}
          ref={actionSheetRef}
          options={["Delete", "Edit", "Share", "Сancel"]}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          onPress={(index) => {
            /* do something */
            if (index === 1) {
              onEdit();
            }
          }}
        />
      </View>
    </>
  );
};

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
    alignItems: "center",
  },
  info: {
    marginLeft: 16,
  },
  date: {
    fontFamily: "Cochin-Bold",
    color: "#B0AFAF",
  },
  more: {
    marginLeft: "auto",
    marginTop: 4,
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
  },
  author: {
    fontSize: 18,
    fontFamily: "Cochin",
    color: "#B0AFAF",
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
