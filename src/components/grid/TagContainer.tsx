import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export const TagContainer: React.FC<Props> = ({ children }) => {
  return <View style={styles.tagContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
