import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const MainButton = ({ clickAction }) => {
  return (
    <TouchableOpacity onPress={clickAction}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Start review process</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FE9CA4",
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: 180,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontFamily: "Cochin-Bold",
  },
});
