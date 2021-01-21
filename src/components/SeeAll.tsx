import React from "react";
import { BaseImage } from "./BaseImage";
import { BaseText } from "./BaseText";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export const SeeAll: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <BaseText isBold>See All</BaseText>
      <BaseImage w={24} h={24} ml={4} source={require("../assets/arrow.png")} />
    </TouchableOpacity>
  );
};
