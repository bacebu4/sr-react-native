import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  StyleProp,
} from "react-native";

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  hue?: number;
  title?: string;
  onLongPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

export const Tag: React.FC<Props> = ({
  onPress,
  hue = 100,
  title = "Tag",
  onLongPress,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        ...styles.wrapper,
        backgroundColor: `hsl(${hue}, 86%, 93%)`,
        // @ts-ignore
        ...style,
      }}
    >
      <Text style={{ ...styles.title, color: `hsl(${hue}, 85%, 40%)` }}>
        <Text>{title}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 200,
    paddingLeft: 16,
    paddingVertical: 8,
    height: 35,
    alignSelf: "flex-start",
  },
  title: {
    fontFamily: "Cochin",
    fontSize: 16,
    marginRight: 16,
    borderRadius: 200,
  },
});
