import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

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
    color: "#343434",
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
