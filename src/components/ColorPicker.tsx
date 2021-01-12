import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Container } from "./grid/Container";

interface Props {
  selectedHue: number;
  onHue: React.Dispatch<React.SetStateAction<number>>;
}

const firstRowOfColors = [
  { hue: 0 },
  { hue: 40 },
  { hue: 80 },
  { hue: 120 },
  { hue: 160 },
];

const secondRowOfColors = [
  { hue: 200 },
  { hue: 240 },
  { hue: 280 },
  { hue: 320 },
  { hue: 360 },
];

export const ColorPicker: React.FC<Props> = ({ selectedHue, onHue }) => {
  return (
    <>
      <Container isRow>
        {firstRowOfColors.map((c, index) => (
          <TouchableOpacity key={c.hue} onPress={() => onHue(c.hue)}>
            <View
              style={{
                ...styles.circle,
                backgroundColor: `hsl(${c.hue}, 86%, 93%)`,
                borderWidth: c.hue === selectedHue ? 1 : 0,
                marginLeft: index === 0 ? 0 : 16,
              }}
            />
          </TouchableOpacity>
        ))}
      </Container>
      <Container isRow mt={16}>
        {secondRowOfColors.map((c, index) => (
          <TouchableOpacity key={c.hue} onPress={() => onHue(c.hue)}>
            <View
              style={{
                ...styles.circle,
                backgroundColor: `hsl(${c.hue}, 86%, 93%)`,
                borderWidth: c.hue === selectedHue ? 1 : 0,
                marginLeft: index === 0 ? 0 : 16,
              }}
            />
          </TouchableOpacity>
        ))}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "red",
    borderColor: "black",
  },
  outline: {
    borderWidth: 1,
  },
});
