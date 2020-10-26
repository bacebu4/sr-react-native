import React, { useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Title } from "./src/Title";

export const SettingsScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "pink",
        padding: 16,
        height: 650,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
  mt: {
    marginTop: 32,
  },
  mts: {
    marginTop: 16,
  },
  mtx: {
    marginTop: 44,
  },
  mb: {
    marginBottom: 150,
  },
  center: {
    alignItems: "center",
  },
});
