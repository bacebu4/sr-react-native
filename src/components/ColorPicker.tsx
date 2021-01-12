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
  { hue: 100 },
  { hue: 200 },
  { hue: 300 },
  { hue: 400 },
  { hue: 500 },
];

const secondRowOfColors = [
  { hue: 150 },
  { hue: 250 },
  { hue: 350 },
  { hue: 450 },
  { hue: 550 },
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
