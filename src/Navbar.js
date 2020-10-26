import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";

export const Navbar = ({ title, handleClick }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity onPress={handleClick}>
          <Image style={styles.icon} source={require("./avatar.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.subbar}>
        <ProgressCircle
          percent={90}
          radius={10}
          borderWidth={4}
          color="#CCA9F9"
          shadowColor="#d7d7d7"
          bgColor="#fff"
        ></ProgressCircle>
        <Text style={styles.info}>Review Process Pending</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    paddingBottom: 16,
  },
  navbar: {
    flexDirection: "row",
    marginTop: 98,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  text: {
    fontSize: 46,
    fontFamily: "Cochin-Bold",
    color: "#343434",
  },
  icon: {
    width: 44,
    height: 44,
  },
  subbar: {
    marginTop: 4,
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
});
