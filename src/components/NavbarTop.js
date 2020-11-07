import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Title } from "../Title";

export const NavbarTop = ({ title = "Default", handleClick }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleClick}>
        <Image style={styles.icon} source={require("../back-arrow.png")} />
      </TouchableOpacity>
      <Title type="small" title={title} />
      <View></View>
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
  title: {
    fontSize: 24,
    fontFamily: "Cochin-Bold",
    color: "#343434",
  },
  text: {
    fontSize: 16,
    color: "#CCA9F9",
    fontWeight: "600",
  },
  icon: {
    width: 24,
    height: 24,
  },
  subbar: {
    marginTop: 12,
    paddingLeft: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    marginLeft: 16,
    fontWeight: "600",
    alignItems: "center",
    color: "#CCA9F9",
  },
  stat: {
    color: "#B0AFAF",
    marginLeft: 16,
  },
});
