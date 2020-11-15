import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";
import { Title } from "../Title";

export const NavbarTop = ({
  title = "Default",
  handleClick,
  handleNext,
  titleRight = "Next",
  titleLeft = null,
  noMargin = false,
}) => {
  return (
    <View
      style={{
        ...styles.navbar,
        marginTop: noMargin ? 40 : Constants.statusBarHeight + 40,
      }}
    >
      <TouchableOpacity onPress={handleClick}>
        {titleLeft ? (
          <>
            <Text style={styles.link}>{titleLeft}</Text>
          </>
        ) : (
          <>
            <Image style={styles.icon} source={require("../back-arrow.png")} />
          </>
        )}
      </TouchableOpacity>

      <Title type="small" title={title} numberOfLines={1} />

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
