import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useTranslation } from "react-i18next";

interface Props {
  children: string;
  style: StyleProp<TextStyle>;
}

export const TText: React.FC<Props> = ({ children, style }) => {
  const { t } = useTranslation();
  return <Text style={style}>{t(children)}</Text>;
};
