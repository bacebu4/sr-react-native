import React from "react";
import { View, TouchableOpacity, GestureResponderEvent } from "react-native";
import Constants from "expo-constants";
import { Title } from "./Title";
import { BaseImage } from "./BaseImage";
import { Container } from "./grid/Container";
import { BaseText } from "./BaseText";
import { useTranslation } from "react-i18next";

interface Props {
  handleClick?: ((event: GestureResponderEvent) => void) | undefined;
  handleNext?: ((event: GestureResponderEvent) => void) | undefined;
  titleRight?: string;
  titleLeft?: string;
  hasNoMargin?: boolean;
  title?: string;
}

export const NavbarTop: React.FC<Props> = ({
  handleClick,
  handleNext,
  titleRight = "Next",
  titleLeft = null,
  hasNoMargin = false,
  title = "Default",
}) => {
  const { t } = useTranslation();
  return (
    <Container
      isRow
      isCenteredY
      mt={hasNoMargin ? 40 : Constants.statusBarHeight + 40}
    >
      <TouchableOpacity onPress={handleClick}>
        {titleLeft ? (
          <BaseText isBold color="purple" mt={4}>
            {titleLeft}
          </BaseText>
        ) : (
          <BaseImage
            w={24}
            h={24}
            source={require("../assets/back-arrow.png")}
          />
        )}
      </TouchableOpacity>

      <Title type="small" title={t(title)} numberOfLines={1} />

      {handleNext ? (
        <BaseText color="purple" isBold mt={4} onPress={handleNext}>
          {titleRight}
        </BaseText>
      ) : (
        <View />
      )}
    </Container>
  );
};
