import React from "react";
import {
  View,
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
}) => {
  return (
    <TouchableOpacity onPress={clickAction}>
      <View
        style={{
          ...styles.wrapper,
          backgroundColor: dark ? "#343434" : "#FE9CA4",
        }}
      >
        {!loading ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <ActivityIndicator></ActivityIndicator>
        )}
      </View>
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
