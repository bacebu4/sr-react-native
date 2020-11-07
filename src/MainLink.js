import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const MainLink = ({ clickAction, title = "Default title" }) => {
  return (
    <TouchableOpacity onPress={clickAction} style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#343434",
    fontFamily: "Cochin-Bold",
  },
});
