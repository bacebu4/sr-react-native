import React from "react";
import { Text, StyleSheet } from "react-native";

export const TextGray = ({ mt = 0, ml = 0, children }) => {
  return (
    <Text style={{ ...styles.text, marginTop: mt, marginLeft: ml }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#B0AFAF",
    marginTop: 16,
    fontWeight: "400",
  },
});
