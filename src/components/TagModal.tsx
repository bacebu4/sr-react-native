import React from "react";
import { Modal } from "react-native";

interface Props {
  modalState: boolean | undefined;
  setModalState: (arg0: boolean) => void;
  children: React.ReactNode;
}

export const TagModal: React.FC<Props> = ({
  modalState,
  setModalState,
  children,
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
      {children}
    </Modal>
  );
};
