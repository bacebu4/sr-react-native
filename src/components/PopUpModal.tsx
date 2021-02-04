import React from "react";
import { Modal, ModalProps, View } from "react-native";
import { BaseImage } from "./BaseImage";
import { Container } from "./grid/Container";
import Constants from "expo-constants";
import { BaseText } from "./BaseText";
import { ScrollView } from "react-native-gesture-handler";
import Markdown from "react-native-markdown-display";

export const PopUpModal: React.FC<ModalProps> = (props) => {
  const { presentationStyle, animationType, ...restProps } = props;

  return (
    <Modal animationType="slide" {...restProps} presentationStyle="fullScreen">
      <ScrollView>
        <Container isRow mt={Constants.statusBarHeight + 40}>
          <View></View>
          <BaseImage
            onPress={props.onRequestClose}
            w={24}
            h={24}
            source={require("../assets/plus.png")}
          />
        </Container>
        <Container>
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
  );
};
