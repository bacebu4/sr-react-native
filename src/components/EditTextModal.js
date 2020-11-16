import React, { useRef, useEffect } from "react";
import { Modal, TextInput } from "react-native";
import { MainContainer } from "./grid/MainContainer";
import { Container } from "./grid/Container";
import { NavbarTop } from "./NavbarTop";

const TextSheet = ({ handleCancel, title, text, onText, handleSave }) => {
  const input = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      input.current.focus();
    }, 100);
  }, []);

  return (
    <MainContainer>
      <Container>
        <NavbarTop
          handleClick={handleCancel}
          handleNext={handleSave}
          title={title}
          titleLeft="Cancel"
          titleRight="Save"
          noMargin
        ></NavbarTop>
      </Container>
      <Container border mt={16}></Container>
      <Container mt={16}>
        <TextInput
          ref={input}
          multiline
          style={{ fontSize: 16 }}
          onChangeText={(text) => onText(text)}
          value={text}
          onSubmitEditing={handleSave}
        ></TextInput>
      </Container>
    </MainContainer>
  );
};

export const EditTextModal = ({
  modalState,
  setModalState,
  title,
  text,
  onText,
  handleSave,
}) => {
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
      <TextSheet
        handleCancel={() => setModalState(false)}
        title={title}
        text={text}
        onText={onText}
        handleSave={handleSave}
      ></TextSheet>
    </Modal>
  );
};
