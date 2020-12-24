import React, { useContext } from "react";
import { Modal } from "react-native";
import { MainContainer } from "./grid/MainContainer";
import { Container } from "./grid/Container";
import { NavbarTopSecondary } from "./NavbarTopSecondary";
import { NotesStoreContext } from "../store/NotesStore";
import { MainButton } from "../MainButton";
import { useTranslation } from "react-i18next";

export const SettingsModal = ({ modalState, setModalState, handleDone }) => {
  const NotesStore = useContext(NotesStoreContext);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    NotesStore.logout();
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
          ></NavbarTopSecondary>
        </Container>
        <Container mt={32} isCentered>
          <MainButton onPress={handleLogout} title="Log out"></MainButton>
          <MainButton
            onPress={() => i18n.changeLanguage("en")}
            title="English lng"
          ></MainButton>
          <MainButton
            onPress={() => i18n.changeLanguage("ru")}
            title="Russian lng"
          ></MainButton>
        </Container>
      </MainContainer>
    </Modal>
  );
};
