import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Constants from "expo-constants";
import { TextGray } from "./TextGray";
import { TText } from "./TText";
import { Title } from "./Title";
import { Container } from "./grid/Container";
import { useTranslation } from "react-i18next";
import { BaseImage } from "./BaseImage";

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
          <TText style={styles.text}>Exit</TText>
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
          color="#CCA9F9"
          shadowColor="#d7d7d7"
          bgColor="#fff"
        />
        <TText style={styles.info}>Review Process</TText>
        <TextGray ml={16}>{index}</TextGray>
        <TextGray ml={4}>
          <TText>more left</TText>
        </TextGray>
      </Container>
      <Container hasBorder mt={16} />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#CCA9F9",
    fontWeight: "600",
  },
  info: {
    marginLeft: 16,
    fontWeight: "600",
    alignItems: "center",
    color: "#CCA9F9",
  },
});
