import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const MainLink = ({ clickAction, title = "Default title" }) => {
  return (
    <TouchableOpacity onPress={clickAction}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
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
