import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// let HUE = 100;

export const Tag = ({ clickAction, hue = 100, title = "Tag" }) => {
  // HUE = hue;
  return (
    <TouchableOpacity onPress={clickAction}>
      <View
        style={{ ...styles.wrapper, backgroundColor: `hsl(${hue}, 86%, 93%)` }}
      >
        <Text style={{ ...styles.title, color: `hsl(${hue}, 85%, 60%)` }}>
          <Text>{title}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 200,
    paddingLeft: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  title: {
    fontFamily: "Cochin",
    fontSize: 16,
    marginRight: 16,
    borderRadius: 200,
  },
});
