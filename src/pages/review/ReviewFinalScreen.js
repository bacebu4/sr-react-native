import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MainButton } from "../../MainButton";
import { Title } from "../../Title";
import { useNavigation } from "@react-navigation/native";

export const ReviewFinalScreen = () => {
  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={require("../../assets/success.png")}
      ></Image>
      <Title title="Congratulations!"></Title>
      <Text style={styles.sub}>You've been on the track for 5 days</Text>
      <MainButton dark title="Go home" clickAction={handleHome}></MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 289,
    height: 240,
    marginBottom: 32,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sub: {
    color: "#B0AFAF",
    marginTop: 32,
    marginBottom: 32,
  },
});
