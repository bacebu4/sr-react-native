import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  title?: string;
}

export const MainLink: React.FC<Props> = ({
  onPress,
  title = "Default title",
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#343434",
    fontFamily: "Cochin-Bold",
  },
});
