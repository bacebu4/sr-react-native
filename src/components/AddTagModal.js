import React from "react";
import { Modal } from "react-native";
import { MainContainer } from "./grid/MainContainer";
import { Container } from "./grid/Container";
import { NavbarTop } from "./NavbarTop";

const AddTagSheet = ({ handleCancel, handleSave }) => {
  return (
    <MainContainer>
      <Container>
        <NavbarTop
          handleClick={handleCancel}
          title="Choose from existing"
          titleLeft="Cancel"
          noMargin
        ></NavbarTop>
      </Container>
      <Container border mt={16}></Container>
    </MainContainer>
  );
};

export const AddTagModal = ({ modalState, setModalState, handleSave }) => {
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
      <AddTagSheet
        handleCancel={() => setModalState(false)}
        handleSave={handleSave}
      ></AddTagSheet>
    </Modal>
  );
};
