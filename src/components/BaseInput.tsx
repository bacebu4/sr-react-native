import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { BLACK_COLOR } from "../utils/colors";

interface Props extends TextInputProps {
  mt?: number;
  refProp?: React.RefObject<TextInput>;
}

export const BaseInput: React.FC<Props> = (props) => {
  const { style, mt, refProp, ...restProps } = props;
  return (
    <TextInput
      ref={refProp}
      {...restProps}
      style={{ ...styles.input, marginTop: mt }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 38,
    backgroundColor: "#eee",
    borderRadius: 10,
    color: BLACK_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
