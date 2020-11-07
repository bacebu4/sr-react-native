import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const Tag = ({
  clickAction,
  hue = 100,
  title = "Tag",
  onLongPress,
  style = {},
}) => {
  return (
    <TouchableOpacity onPress={clickAction} onLongPress={onLongPress}>
      <View
        style={{
          ...styles.wrapper,
          backgroundColor: `hsl(${hue}, 86%, 93%)`,
          ...style,
        }}
      >
        <Text style={{ ...styles.title, color: `hsl(${hue}, 85%, 40%)` }}>
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
    height: 35,
    alignSelf: "flex-start",
  },
  title: {
    fontFamily: "Cochin",
    fontSize: 16,
    marginRight: 16,
    borderRadius: 200,
  },
});
