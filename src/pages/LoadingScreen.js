import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={styles.main}>
      <View style={styles.center}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
