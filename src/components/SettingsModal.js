import React, { useContext } from "react";
import { Modal } from "react-native";
import { MainContainer } from "./grid/MainContainer";
import { Container } from "./grid/Container";
import { NavbarTopSecondary } from "./NavbarTopSecondary";
import { NotesStoreContext } from "../store/NotesStore";
import { MainButton } from "../MainButton";

export const SettingsModal = ({ modalState, setModalState, handleDone }) => {
  const NotesStore = useContext(NotesStoreContext);

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
            title="Account Preferences"
            handleNext={handleDone}
            titleRight="Done"
            hasNoMargin
          ></NavbarTopSecondary>
        </Container>
        <Container mt={32} isCentered>
          <MainButton clickAction={handleLogout} title="Log out"></MainButton>
        </Container>
      </MainContainer>
    </Modal>
  );
};
