import React from "react";
import { TText } from "./TText";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
} from "react-native";

export const SeeAll: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity {...props} style={styles.wrapper}>
      <TText style={styles.title}>See All</TText>
      <Image style={styles.icon} source={require("../arrow.png")} />
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
  icon: {
    marginLeft: 4,
    width: 24,
    height: 24,
  },
});
