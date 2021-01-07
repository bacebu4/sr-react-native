import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Constants from "expo-constants";
import { TextGray } from "./components/TextGray";
import { TText } from "./components/TText";

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
          <TText style={styles.text}>Exit</TText>
        </TouchableOpacity>
        <TText style={styles.title}>{title}</TText>
        {index !== 0 ? (
          <>
            <TouchableOpacity onPress={handleNext}>
              <Image
                style={styles.icon}
                source={require("./assets/arrow.png")}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleClick}>
              <Image
                style={styles.icon}
                source={require("./assets/arrow.png")}
              />
            </TouchableOpacity>
          </>
        )}
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
        <TText style={styles.info}>Review Process</TText>
        <TextGray ml={16}>{index}</TextGray>
        <TextGray ml={4}>
          <TText>more left</TText>
        </TextGray>
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
});
