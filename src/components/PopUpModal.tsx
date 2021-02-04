import React from "react";
import { Modal, ModalProps, View, StatusBar } from "react-native";
import { BaseImage } from "./BaseImage";
import { Container } from "./grid/Container";
import { ScrollView } from "react-native-gesture-handler";
import Markdown from "react-native-markdown-display";

export const PopUpModal: React.FC<ModalProps> = (props) => {
  const { presentationStyle, animationType, ...restProps } = props;

  return (
    <>
      <Modal
        animationType="slide"
        {...restProps}
        presentationStyle="fullScreen"
      >
        <StatusBar hidden />
        <Container isRow mt={24}>
          <View />
          <BaseImage
            onPress={props.onRequestClose}
            w={36}
            h={36}
            source={require("../assets/close.png")}
          />
        </Container>

        <ScrollView>
          <Container mt={16}>
            <Markdown
              style={{
                body: { fontSize: 16, lineHeight: 24 },
                heading1: { marginTop: 32, fontWeight: "bold", lineHeight: 48 },
                heading2: { marginTop: 24, lineHeight: 32 },
              }}
            >
              {props.children}
            </Markdown>
          </Container>
        </ScrollView>
      </Modal>
    </>
  );
};
