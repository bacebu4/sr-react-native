import React from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  TextProps,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from "react-native";

type colorVariants = "purple" | "gray" | undefined;

const colorSwitch = (color: colorVariants) => {
  switch (color) {
    case "gray":
      return "#B0AFAF";

    case "purple":
      return "#CCA9F9";

    default:
      return "#343434";
  }
};

interface Props extends TextProps {
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  fz?: number;
  isBold?: boolean;
  isSerif?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  shouldNotTranslate?: boolean;
  color?: colorVariants;
  children: React.ReactNode;
}

export const BaseText: React.FC<Props> = (props) => {
  const {
    mt,
    mb,
    ml,
    mr,
    fz,
    isBold,
    isSerif,
    onPress,
    color,
    shouldNotTranslate,
    children,
    ...restProps
  } = props;

  const { t } = useTranslation();

  const styles: StyleProp<TextStyle> = {
    marginTop: mt,
    marginBottom: mb,
    marginLeft: ml,
    marginRight: mr,
    fontSize: fz ?? 16,
    fontWeight: isBold ? "600" : undefined,
    fontFamily: isSerif ? "Cochin" : undefined,
    color: colorSwitch(color),
  };

  const TextComponentTranslated = (
    <Text {...restProps} style={styles}>
      {t(String(children))}
    </Text>
  );

  const TextComponentNotTranslated = (
    <Text {...restProps} style={styles}>
      {children}
    </Text>
  );

  if (onPress && shouldNotTranslate) {
    return (
      <TouchableOpacity onPress={onPress}>
        {TextComponentNotTranslated}
      </TouchableOpacity>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {TextComponentTranslated}
      </TouchableOpacity>
    );
  }

  if (shouldNotTranslate) {
    return TextComponentNotTranslated;
  }

  return TextComponentTranslated;
};
