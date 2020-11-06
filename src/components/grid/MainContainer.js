import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const MainContainer = ({ children }) => {
  return <View style={styles.mainContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
