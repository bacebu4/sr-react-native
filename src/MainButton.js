import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export const MainButton = ({
  clickAction,
  title = "Start review process",
  loading = false,
  dark = false,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={clickAction}
      style={{
        ...styles.wrapper,
        ...style,
        backgroundColor: dark ? "#343434" : "#FE9CA4",
      }}
    >
      {!loading ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontFamily: "Cochin-Bold",
  },
});
