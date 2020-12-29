import React, { useContext } from "react";
import { GestureResponderEvent, Modal } from "react-native";
import { MainContainer } from "./grid/MainContainer";
import { Container } from "./grid/Container";
import { NavbarTopSecondary } from "./NavbarTopSecondary";
// @ts-ignore
import { NotesStoreContext } from "../store/NotesStore";
import { MainButton } from "../MainButton";
import { useTranslation } from "react-i18next";

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
  const NotesStore = useContext(NotesStoreContext);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    // @ts-ignore
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
