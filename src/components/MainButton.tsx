import React from "react";
import { BaseText } from "./BaseText";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";
import { BLACK_COLOR } from "../utils/colors";

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
        backgroundColor: isDark ? BLACK_COLOR : "#FE9CA4",
      }}
    >
      {!isLoading ? (
        <BaseText isBold isSerif color="white" fz={14}>
          {title}
        </BaseText>
      ) : (
        <ActivityIndicator />
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
});
