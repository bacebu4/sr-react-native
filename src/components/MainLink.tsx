import React from "react";
import { BaseText } from "./BaseText";
import { GestureResponderEvent } from "react-native";

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  title?: string;
}

export const MainLink: React.FC<Props> = ({
  onPress,
  title = "Default title",
}) => {
  return (
    <BaseText isSerif isBold fz={14} onPress={onPress}>
      {title}
    </BaseText>
  );
};
