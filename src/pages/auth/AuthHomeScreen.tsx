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
        <TText style={{ ...styles.mtx, ...styles.text }}>
          Remember what you read
        </TText>
        <View style={styles.button}>
          <MainButton
            title="Sign up free"
            onPress={() => navigation.navigate("AuthEmail")}
          ></MainButton>
        </View>
        <View style={styles.mts}>
          <MainLink
            title={t("Already have an account?")}
            onPress={() => navigation.navigate("AuthLogin")}
          ></MainLink>
        </View>
      </Container>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  button: {
    marginTop: 74,
    width: 180,
  },

  mts: {
    marginTop: 16,
  },
  mtx: {
    marginTop: 44,
  },

  center: {
    alignItems: "center",
  },
});
