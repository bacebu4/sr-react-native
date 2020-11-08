import React from "react";
import { StyleSheet, View } from "react-native";

export const MainContainer = ({ children, center }) => {
  return (
    <View
      style={{
        ...styles.mainContainer,
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
