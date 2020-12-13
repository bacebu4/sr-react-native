import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  numberOfLines?: number | undefined;
  title: string;
  type?: "small" | "big";
}

export const Title: React.FC<Props> = ({
  title,
  type,
  numberOfLines = undefined,
}) => {
  return (
    <View>
      {numberOfLines ? (
        <Text
          style={{
            ...styles.text,
            fontSize: type === "small" ? 24 : type === "big" ? 46 : 32,
          }}
          numberOfLines={numberOfLines}
        >
          {title}
        </Text>
      ) : (
        <Text
          style={{
            ...styles.text,
            fontSize: type === "small" ? 24 : type === "big" ? 46 : 32,
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Cochin-Bold",
    color: "#343434",
  },
});
