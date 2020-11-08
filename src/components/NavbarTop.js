import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";
import { Title } from "../Title";

export const NavbarTop = ({ title = "Default", handleClick, handleNext }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleClick}>
        <Image style={styles.icon} source={require("../back-arrow.png")} />
      </TouchableOpacity>
      <Title type="small" title={title} />
      {handleNext ? (
        <>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.link}>Next</Text>
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
    marginTop: Constants.statusBarHeight + 40,
    justifyContent: "space-between",
    alignItems: "center",
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
