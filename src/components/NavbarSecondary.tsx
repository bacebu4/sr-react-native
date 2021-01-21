import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Constants from "expo-constants";
import { TextGray } from "./TextGray";
import { TText } from "./TText";
import { Title } from "./Title";
import { Container } from "./grid/Container";
import { useTranslation } from "react-i18next";
import { BaseImage } from "./BaseImage";
import { PURPLE_COLOR } from "../utils/colors";
import { BaseText } from "./BaseText";

interface Props {
  title: string;
  handleClick: ((event: GestureResponderEvent) => void) | undefined;
  handleNext: ((event: GestureResponderEvent) => void) | undefined;
  index: number;
  amount: number;
}

export const NavbarSecondary: React.FC<Props> = ({
  title,
  handleClick,
  handleNext,
  index,
  amount,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Container
        isRow
        mt={Constants.statusBarHeight + 40}
        style={{ alignItems: "baseline" }}
      >
        <TouchableOpacity onPress={handleClick}>
          <BaseText color="purple" isBold>
            Exit
          </BaseText>
        </TouchableOpacity>
        <Title title={t(title)} />
        {index !== 0 ? (
          <BaseImage
            w={24}
            h={24}
            source={require("../assets/arrow.png")}
            onPress={handleNext}
          />
        ) : (
          <BaseImage
            w={24}
            h={24}
            source={require("../assets/arrow.png")}
            onPress={handleClick}
          />
        )}
      </Container>
      <Container
        isRow
        mt={12}
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 4,
        }}
      >
        <ProgressCircle
          percent={((amount - index) / amount) * 100}
          radius={10}
          borderWidth={4}
          color={PURPLE_COLOR}
          shadowColor="#d7d7d7"
          bgColor="#fff"
        />
        <BaseText ml={16} isBold color="purple">
          Review Process
        </BaseText>
        <TextGray ml={16}>{index}</TextGray>
        <TextGray ml={4}>
          <TText>more left</TText>
        </TextGray>
      </Container>
      <Container hasBorder mt={16} />
    </>
  );
};
