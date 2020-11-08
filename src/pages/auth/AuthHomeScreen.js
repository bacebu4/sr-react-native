import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { MainButton } from "../../MainButton";
import { MainLink } from "../../MainLink";

export const AuthHomeScreen = ({ navigation }) => {
  return (
    <MainContainer center>
      <Container center>
        <Image style={styles.image} source={require("../../login.png")} />
        <Text style={{ ...styles.mtx, ...styles.text }}>
          Remember what you read
        </Text>
        <View style={styles.button}>
          <MainButton
            title="Sign up free"
            clickAction={() => navigation.navigate("AuthEmail")}
          ></MainButton>
        </View>
        <View style={styles.mts}>
          <MainLink
            title="Log in"
            clickAction={() => navigation.navigate("AuthLogin")}
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
