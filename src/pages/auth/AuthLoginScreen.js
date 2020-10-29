import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MainButton } from "../../MainButton";
import { MainLink } from "../../MainLink";
import { NavbarTop } from "../../components/NavbarTop";

export const AuthLoginScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <NavbarTop
          title="Log In"
          handleClick={() => navigation.goBack()}
        ></NavbarTop>
        <View style={styles.center}>
          <View style={styles.button}>
            <MainButton title="Log In"></MainButton>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 32,
    paddingRight: 32,
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: 315,
    height: 250,
  },
  text: {
    fontSize: 45,
    fontFamily: "Cochin",
    textAlign: "center",
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
