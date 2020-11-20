import React, { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MainButton } from "../../MainButton";
import { Title } from "../../Title";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";

export const ReviewFinalScreen = observer(() => {
  const navigation = useNavigation();
  const NotesStore = useContext(NotesStoreContext);

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
      <Text style={styles.sub}>
        You've been on the track for {NotesStore.info.streak} days
      </Text>
      <MainButton dark title="Go home" clickAction={handleHome}></MainButton>
    </View>
  );
});

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
  mt: {
    marginTop: 32,
  },
});
