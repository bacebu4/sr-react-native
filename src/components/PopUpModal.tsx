import React from "react";
import { Modal, ModalProps, View } from "react-native";
import { BaseImage } from "./BaseImage";
import { Container } from "./grid/Container";
import Constants from "expo-constants";
import { BaseText } from "./BaseText";
import { ScrollView } from "react-native-gesture-handler";

export const PopUpModal: React.FC<ModalProps> = (props) => {
  const { presentationStyle, animationType, ...restProps } = props;

  return (
    <Modal animationType="slide" {...restProps} presentationStyle="fullScreen">
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
        <ScrollView>
          <BaseText>{props.children}</BaseText>
        </ScrollView>
      </Container>
    </Modal>
  );
};
