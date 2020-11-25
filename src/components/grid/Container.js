import React from "react";
import { StyleSheet, View } from "react-native";

export const Container = ({
  children,
  mt = 0,
  center = false,
  centerY = false,
  border = false,
  mb = 0,
  pb = 0,
  style = {},
  row = false,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        marginTop: mt,
        marginBottom: mb,
        alignItems: center ? "center" : "stretch",
        justifyContent: centerY ? "center" : "flex-start",
        borderBottomWidth: border ? 1 : 0,
        borderBottomColor: border ? "#d7d7d7" : "white",
        ...style,
        flexDirection: row ? "row" : "column",
        justifyContent: row ? "space-between" : "flex-start",
        paddingBottom: pb,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
  },
});
