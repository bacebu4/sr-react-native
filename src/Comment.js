import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actionsheet";

export const Comment = ({ text }) => {
  const actionSheetRef = React.useRef(null);

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View>
          <Text style={styles.date}>2020-10-25</Text>
        </View>
        <View style={styles.more}>
          <TouchableOpacity onPress={showActionSheet}>
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
        }}
      />
    </View>
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
