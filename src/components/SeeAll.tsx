import React from "react";
import { TText } from "./TText";
import { BaseImage } from "./BaseImage";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export const SeeAll: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity {...props} style={styles.wrapper}>
      <TText style={styles.title}>See All</TText>
      <BaseImage w={24} h={24} ml={4} source={require("../assets/arrow.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#343434",
    fontSize: 16,
    fontWeight: "600",
  },
});
