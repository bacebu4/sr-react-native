import React from "react";
import {
  Image,
  ImageProps,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface Props extends ImageProps {
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  w?: number;
  h?: number;
  br?: number;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
}

export const BaseImage: React.FC<Props> = (props) => {
  const { mt, mb, ml, mr, w, h, br, onPress, disabled, ...restProps } = props;

  const ImageComponent = (
    <Image
      {...restProps}
      style={{
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        width: w,
        height: h,
        borderRadius: br,
      }}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        {ImageComponent}
      </TouchableOpacity>
    );
  }

  return ImageComponent;
};
