import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
  isCentered?: boolean;
  isCenteredY?: boolean;
  pt?: number;
}

export const MainContainer: React.FC<Props> = ({
  children,
  isCentered,
  isCenteredY = false,
  pt,
}) => {
  return (
    <View
      style={{
        ...styles.mainContainer,
        justifyContent: isCentered ? "center" : "flex-start",
        alignItems: isCenteredY ? "center" : "stretch",
        paddingTop: pt,
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
