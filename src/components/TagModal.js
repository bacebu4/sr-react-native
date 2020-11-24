import React from "react";
import { Modal } from "react-native";

export const TagModal = ({ modalState, setModalState, children }) => {
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
      {children}
    </Modal>
  );
};
