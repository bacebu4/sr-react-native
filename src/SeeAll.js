import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export const SeeAll = ({ clickAction }) => {
  return (
    <TouchableOpacity onPress={clickAction} style={styles.wrapper}>
      <Text style={styles.title}>See All</Text>
      <Image style={styles.icon} source={require("./arrow.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#343434",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginLeft: 4,
    width: 24,
    height: 24,
  },
});
