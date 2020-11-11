import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";
import { Title } from "../Title";

export const NavbarTopSecondary = ({
  title = "Default",
  handleNext,
  titleRight = "Next",
  noMargin = false,
}) => {
  return (
    <View
      style={{
        ...styles.navbar,
        marginTop: noMargin ? 40 : Constants.statusBarHeight + 40,
      }}
    >
      <Title title={title} />
      {handleNext ? (
        <>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.link}>{titleRight}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View></View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  icon: {
    width: 24,
    height: 24,
  },
  link: {
    color: "#CCA9F9",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
});
