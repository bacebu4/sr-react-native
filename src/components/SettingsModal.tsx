import React, { useContext } from "react";
import {
  GestureResponderEvent,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MainContainer } from "./grid/MainContainer";
import { Container } from "./grid/Container";
import { NavbarTopSecondary } from "./NavbarTopSecondary";
import { MainButton } from "./MainButton";
import { useTranslation } from "react-i18next";
import { UiStoreContext } from "../store/UiStore";
import { TextGray } from "./TextGray";
import { BaseImage } from "./BaseImage";

interface Props {
  modalState: boolean;
  setModalState: (arg0: boolean) => void;
  handleDone: (event: GestureResponderEvent) => void;
}

export const SettingsModal: React.FC<Props> = ({
  modalState,
  setModalState,
  handleDone,
}) => {
  const UiStore = useContext(UiStoreContext);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    UiStore.logout();
  };

  return (
    <Modal
      animationType="slide"
      visible={modalState}
      onRequestClose={() => {
        setModalState(false);
      }}
      onDismiss={() => setModalState(false)}
      presentationStyle="formSheet"
    >
      <MainContainer>
        <Container>
          <NavbarTopSecondary
            title={t("Account preferences")}
            handleNext={handleDone}
            titleRight={t("Done")}
            hasNoMargin
          />
        </Container>

        <Container
          mt={32}
          isRow
          isCentered
          style={{ justifyContent: "flex-start" }}
        >
          <Image style={styles.icon} source={require("../assets/avatar.png")} />
          <Container>
            <Text style={styles.text}>Vasilii Krasikov</Text>
            <TextGray>vasua14735@icloud.com</TextGray>
          </Container>
        </Container>

        <Container mt={44} isRow isCentered>
          <Text style={styles.text}>Hightlights per day</Text>
          <Container isRow isCentered hasNoMargin>
            <BaseImage
              w={24}
              h={24}
              mr={16}
              source={require("../assets/chevronLeft.png")}
            />
            <Text style={styles.text}>3</Text>
            <BaseImage
              w={24}
              h={24}
              ml={16}
              source={require("../assets/chevronRight.png")}
            />
          </Container>
        </Container>

        <Container mt={16}>
          <TextGray>
            Configure how much highlights you want to see on a daily basis
          </TextGray>
        </Container>

        <Container mt={32} isRow isCentered>
          <Text style={styles.text}>Language</Text>
          <Text style={styles.text}>En</Text>
        </Container>

        <Container mt={16}>
          <TextGray>
            Configure the language you want to see in the application
          </TextGray>
        </Container>

        <Container mt={32}>
          <Text style={styles.text}>Restart manual</Text>
        </Container>

        <Container mt={16}>
          <TextGray>
            Click this button if you want to see thr tutorial all over again in
            case you miss something
          </TextGray>
        </Container>

        <Container mt={44}>
          <Text style={styles.text}>Show terms and conditions</Text>
        </Container>

        <Container mt={24}>
          <Text style={styles.text}>Show privacy policy</Text>
        </Container>

        <Container mt={64} isCentered>
          <MainButton onPress={handleLogout} title="Sign Out" />
          {/* <MainButton
            onPress={() => i18n.changeLanguage("en")}
            title="English lng"
          />
          <MainButton
            onPress={() => i18n.changeLanguage("ru")}
            title="Russian lng"
          /> */}
        </Container>
      </MainContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 44,
    height: 44,
  },
  text: {
    fontWeight: "600",
    color: "#343434",
    fontSize: 16,
  },
});
