import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { BLACK_COLOR } from "../utils/colors";

interface Props extends TextInputProps {
  mt?: number;
}

export const StrippedInput: React.FC<Props> = (props) => {
  const { style, mt, ...restProps } = props;
  return (
    <TextInput {...restProps} style={{ ...styles.input, marginTop: mt }} />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 4,
    color: BLACK_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1,
    textAlign: "center",
    width: 150,
  },
});
