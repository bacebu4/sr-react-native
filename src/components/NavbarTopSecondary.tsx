import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from "react-native";
import Constants from "expo-constants";
import { Title } from "./Title";

interface Props {
  title?: string;
  handleNext: ((event: GestureResponderEvent) => void) | undefined;
  titleRight?: string;
  hasNoMargin?: boolean;
}

export const NavbarTopSecondary: React.FC<Props> = ({
  title = "Default",
  handleNext,
  titleRight = "Next",
  hasNoMargin = false,
}) => {
  return (
    <View
      style={{
        ...styles.navbar,
        marginTop: hasNoMargin ? 40 : Constants.statusBarHeight + 40,
      }}
    >
      <Title title={title} />
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
