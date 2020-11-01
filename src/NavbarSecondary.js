import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Constants from "expo-constants";

export const NavbarSecondary = ({
  title,
  handleClick,
  handleNext,
  index,
  amount,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleClick}>
          <Text style={styles.text}>Exit</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleNext}>
          <Image style={styles.icon} source={require("./arrow.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.subbar}>
        <ProgressCircle
          percent={((amount - index) / amount) * 100}
          radius={10}
          borderWidth={4}
          color="#CCA9F9"
          shadowColor="#d7d7d7"
          bgColor="#fff"
        ></ProgressCircle>
        <Text style={styles.info}>Review Process</Text>
        <Text style={styles.stat}>{index} more left</Text>
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
    marginTop: Constants.statusBarHeight + 40,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  title: {
    fontSize: 32,
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
