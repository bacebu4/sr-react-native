import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MainButton } from "../../MainButton";
import { MainLink } from "../../MainLink";

export const AuthHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../login.png")} />
      <Text style={{ ...styles.mtx, ...styles.text }}>
        Remember what you read
      </Text>
      <View style={styles.button}>
        <MainButton title="Sign up free"></MainButton>
      </View>
      <View style={styles.mts}>
        <MainLink
          title="Log in"
          clickAction={() => navigation.navigate("AuthLogin")}
        ></MainLink>
      </View>
    </View>
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
  mt: {
    marginTop: 32,
  },
  mts: {
    marginTop: 16,
  },
  mtx: {
    marginTop: 44,
  },
  mb: {
    marginBottom: 150,
  },
  center: {
    alignItems: "center",
  },
});
