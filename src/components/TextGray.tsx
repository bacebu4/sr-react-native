import React from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  mt?: number;
  ml?: number;
  children: React.ReactNode;
}

export const TextGray: React.FC<Props> = ({ mt = 0, ml = 0, children }) => {
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
