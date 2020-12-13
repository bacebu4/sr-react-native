import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from "react-native";
import Constants from "expo-constants";
import { Title } from "./Title";

interface Props {
  handleClick?: ((event: GestureResponderEvent) => void) | undefined;
  handleNext?: ((event: GestureResponderEvent) => void) | undefined;
  titleRight?: string;
  titleLeft?: string;
  hasNoMargin?: boolean;
  title?: string;
}

export const NavbarTop: React.FC<Props> = ({
  handleClick,
  handleNext,
  titleRight = "Next",
  titleLeft = null,
  hasNoMargin = false,
  title = "Default",
}) => {
  return (
    <View
      style={{
        ...styles.navbar,
        marginTop: hasNoMargin ? 40 : Constants.statusBarHeight + 40,
      }}
    >
      <TouchableOpacity onPress={handleClick}>
        {titleLeft ? (
          <Text style={styles.link}>{titleLeft}</Text>
        ) : (
          <Image style={styles.icon} source={require("../back-arrow.png")} />
        )}
      </TouchableOpacity>

      <Title type="small" title={title} numberOfLines={1} />

      {handleNext ? (
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.link}>{titleRight}</Text>
        </TouchableOpacity>
      ) : (
        <View />
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
