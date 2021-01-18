import React, { useContext } from "react";
import { GestureResponderEvent, Modal } from "react-native";
import { MainContainer } from "./grid/MainContainer";
import { Container } from "./grid/Container";
import { NavbarTopSecondary } from "./NavbarTopSecondary";
import { MainButton } from "./MainButton";
import { useTranslation } from "react-i18next";
import { UiStoreContext } from "../store/UiStore";

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
          ></NavbarTopSecondary>
        </Container>
        <Container mt={32} isCentered>
          <MainButton onPress={handleLogout} title="Log out" />
          <MainButton
            onPress={() => i18n.changeLanguage("en")}
            title="English lng"
          />
          <MainButton
            onPress={() => i18n.changeLanguage("ru")}
            title="Russian lng"
          />
        </Container>
      </MainContainer>
    </Modal>
  );
};
