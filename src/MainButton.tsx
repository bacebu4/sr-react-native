import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";

interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  title?: string;
  isLoading?: boolean;
  isDark?: boolean;
  style?: ViewStyle;
}

export const MainButton: React.FC<Props> = ({
  onPress,
  title = "Start review process",
  isLoading = false,
  isDark = false,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.wrapper,
        ...style,
        backgroundColor: isDark ? "#343434" : "#FE9CA4",
      }}
    >
      {!isLoading ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontFamily: "Cochin-Bold",
  },
});
