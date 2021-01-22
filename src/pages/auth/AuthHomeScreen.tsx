import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { AuthStackParamList } from "src/stacks/AuthStackScreen";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { MainButton } from "../../components/MainButton";
import { MainLink } from "../../components/MainLink";
import { useTranslation } from "react-i18next";
import { BaseImage } from "../../components/BaseImage";
import { BaseText } from "../../components/BaseText";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "AuthHome">;
}

export const AuthHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <MainContainer isCentered>
      <Container isCentered>
        <BaseImage w={315} h={250} source={require("../../assets/login.png")} />
        <BaseText
          mt={44}
          fz={45}
          isBold
          isSerif
          style={{ textAlign: "center" }}
        >
          Remember what you read
        </BaseText>
        <Container mt={74} style={{ marginHorizontal: 80 }}>
          <MainButton
            title="Sign up free"
            onPress={() => navigation.navigate("AuthEmail")}
          />
        </Container>
        <View style={{ marginTop: 16 }}>
          <MainLink
            title={t("Already have an account?")}
            onPress={() => navigation.navigate("AuthLogin")}
          />
        </View>
      </Container>
    </MainContainer>
  );
};
