import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  children?: React.ReactNode;
  mt?: number;
  mb?: number;
  pb?: number;
  isCentered?: boolean;
  isCenteredY?: boolean;
  hasBorder?: boolean;
  style?: ViewStyle;
  isRow?: false;
}

export const Container: React.FC<Props> = ({
  children,
  mt = 0,
  isCentered = false,
  isCenteredY = false,
  hasBorder = false,
  mb = 0,
  pb = 0,
  style = {},
  isRow = false,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        marginTop: mt,
        marginBottom: mb,
        alignItems: isCentered ? "center" : "stretch",
        borderBottomWidth: hasBorder ? 1 : 0,
        borderBottomColor: hasBorder ? "#d7d7d7" : "white",
        ...style,
        flexDirection: isRow ? "row" : "column",
        justifyContent: isRow
          ? "space-between"
          : isCenteredY
          ? "center"
          : "flex-start",
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
