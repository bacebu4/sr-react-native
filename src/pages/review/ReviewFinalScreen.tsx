import React from "react";
import { StyleSheet, Image } from "react-native";
import { MainButton } from "../../components/MainButton";
import { Title } from "../../components/Title";
import { useNavigation } from "@react-navigation/native";
import { TextGray } from "../../components/TextGray";
import { useTranslation } from "react-i18next";
import { useInfoQuery } from "../../generated/graphql";
import { MainContainer } from "../../components/grid/MainContainer";

interface Props {
  jumpTo?: (key: string) => void;
}

export const ReviewFinalScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [result] = useInfoQuery();
  const { t } = useTranslation();

  const handleHome = () => {
    navigation.navigate("Home");
  };

  return (
    <MainContainer isCentered isCenteredY>
      <Image
        style={styles.image}
        source={require("../../assets/success.png")}
      />
      <Title title={t("Congrats")} />
      <TextGray mt={32}>
        You've been on the track for {result.data?.info?.streak}{" "}
        {result.data?.info?.streak === 1 ? "day" : "days"}
      </TextGray>
      <MainButton
        isDark
        title="Go home"
        onPress={handleHome}
        style={{ marginTop: 32 }}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 289,
    height: 240,
    marginBottom: 32,
  },
});
