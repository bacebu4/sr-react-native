import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Title = ({ title, type }) => {
  return (
    <View>
      <Text
        style={{
          ...styles.text,
          fontSize: type === "small" ? 24 : type === "big" ? 46 : 32,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Cochin-Bold",
    color: "#343434",
  },
});
