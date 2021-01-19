import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { AuthStackParamList } from "src/stacks/AuthStackScreen";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { MainButton } from "../../components/MainButton";
import { MainLink } from "../../components/MainLink";
import { TText } from "../../components/TText";
import { useTranslation } from "react-i18next";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "AuthHome">;
}

export const AuthHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <MainContainer isCentered>
      <Container isCentered>
        <Image
          style={styles.image}
          source={require("../../assets/login.png")}
        />
        <TText style={{ marginTop: 44, ...styles.text }}>
          Remember what you read
        </TText>
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

const styles = StyleSheet.create({
  image: {
    width: 315,
    height: 250,
  },
  text: {
    fontSize: 45,
    fontFamily: "Cochin-Bold",
    textAlign: "center",
    color: "#343434",
  },
});
