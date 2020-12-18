import React, { useRef, useEffect, RefObject } from "react";
import { GestureResponderEvent, Modal, TextInput } from "react-native";
import { MainContainer } from "./grid/MainContainer";
import { Container } from "./grid/Container";
import { NavbarTop } from "./NavbarTop";

interface Props {
  handleCancel: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  text: string | undefined;
  onText: (text: string) => void;
  handleSave: (<T>(e: T) => void) | undefined;
}

const TextSheet: React.FC<Props> = ({
  handleCancel,
  title,
  text,
  onText,
  handleSave,
}) => {
  const input = useRef<RefObject<TextInput> | null>(null);

  useEffect(() => {
    setTimeout(() => {
      //@ts-ignore
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
          hasNoMargin
        ></NavbarTop>
      </Container>
      <Container hasBorder mt={16}></Container>
      <Container mt={16}>
        <TextInput
          ref={input as any}
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

interface PropsMain {
  modalState: boolean | undefined;
  setModalState: (arg0: boolean) => void;
  title: string;
  text: string | undefined;
  onText: (text: string) => void;
  handleSave: (<T>(e: T) => void) | undefined;
}

export const EditTextModal: React.FC<PropsMain> = ({
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
