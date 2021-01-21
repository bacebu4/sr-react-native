import React from "react";
import { View, GestureResponderEvent } from "react-native";
import Constants from "expo-constants";
import { Title } from "./Title";
import { BaseText } from "./BaseText";
import { Container } from "./grid/Container";

interface Props {
  title?: string;
  handleNext: ((event: GestureResponderEvent) => void) | undefined;
  titleRight?: string;
  hasNoMargin?: boolean;
}

export const NavbarTopSecondary: React.FC<Props> = ({
  title = "Default",
  handleNext,
  titleRight = "Next",
  hasNoMargin = false,
}) => {
  return (
    <Container
      isRow
      style={{ alignItems: "baseline" }}
      mt={hasNoMargin ? 40 : Constants.statusBarHeight + 40}
    >
      <Title title={title} />
      {handleNext ? (
        <BaseText isBold mt={4} color="purple" onPress={handleNext}>
          {titleRight}
        </BaseText>
      ) : (
        <View />
      )}
    </Container>
  );
};
