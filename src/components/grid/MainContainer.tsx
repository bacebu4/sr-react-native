import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
  isCentered: boolean
}

export const MainContainer: React.FC<Props> = ({ children, isCentered }) => {
  return (
    <View
      style={{
        ...styles.mainContainer,
        justifyContent: isCentered ? "center" : "flex-start",
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
