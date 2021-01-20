import React from "react";
import {
  Image,
  ImageProps,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface Props extends ImageProps {
  mt?: number;
  ml?: number;
  mr?: number;
  w: number;
  h: number;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const BaseImage: React.FC<Props> = (props) => {
  const { mt, ml, mr, w, h, onPress, ...restProps } = props;

  const ImageComponent = (
    <Image
      {...restProps}
      style={{
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        width: w,
        height: h,
      }}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>{ImageComponent}</TouchableOpacity>
    );
  }

  return ImageComponent;
};
