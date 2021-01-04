import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import { MainButton } from "../../MainButton";
import { Title } from "../../components/Title";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
// @ts-ignore
import { NotesStoreContext } from "../../store/NotesStore";
import { TextGray } from "../../components/TextGray";
import { useTranslation } from "react-i18next";

interface Props {
  jumpTo?: (key: string) => void;
}

export const ReviewFinalScreen: React.FC<Props> = observer(() => {
  const navigation = useNavigation();
  const NotesStore = useContext(NotesStoreContext);
  const { t } = useTranslation();

  const handleHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={require("../../assets/success.png")}
      ></Image>
      <Title title={t("Congrats")}></Title>
      <TextGray mt={32}>
        {/* @ts-ignore */}
        You've been on the track for {NotesStore.info.streak} days
      </TextGray>
      <MainButton
        isDark
        title="Go home"
        onPress={handleHome}
        style={{ marginTop: 32 }}
      ></MainButton>
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
  mt: {
    marginTop: 32,
  },
});
