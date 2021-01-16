import React, { useContext, useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { useMessage } from "../../hooks/message.hook";
import { MainButton } from "../../components/MainButton";
import { BaseInput } from "../../components/BaseInput";

export const AuthLoginScreen = observer(({ navigation }) => {
  const [email, onEmail] = useState("");
  const [password, onPassword] = useState("");
  const passwordInput = useRef(null);
  const message = useMessage();

  const NotesStore = useContext(NotesStoreContext);

  const handleSubmit = async () => {
    try {
      await NotesStore.login(email, password);
      console.log("logged");
    } catch (error) {
      message(error.message);
    }
  };
  return (
    <MainContainer>
      <Container>
        <NavbarTop
          title="Log In"
          handleClick={() => navigation.goBack()}
        ></NavbarTop>
        <Text style={styles.heading}>Email</Text>

        <BaseInput
          mt={8}
          autoFocus
          onChangeText={(text) => onEmail(text)}
          value={email}
          keyboardType="email-address"
          onSubmitEditing={() => passwordInput.current.focus()}
        />
        <Text style={styles.heading}>Password</Text>
        <BaseInput
          mt={8}
          ref={passwordInput}
          onChangeText={(text) => onPassword(text)}
          value={password}
          secureTextEntry
          onSubmitEditing={handleSubmit}
        />
        <View style={styles.center}>
          <View style={styles.button}>
            <MainButton
              title="Log In"
              onPress={handleSubmit}
              isLoading={NotesStore.isLoginLoading}
            ></MainButton>
          </View>
        </View>
      </Container>
    </MainContainer>
  );
});

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: "#343434",
    fontWeight: "700",
    marginTop: 22,
  },
  text: {
    fontSize: 45,
    fontFamily: "Cochin",
    textAlign: "center",
  },
  button: {
    marginTop: 74,
    width: 180,
  },
  center: {
    alignItems: "center",
  },
});
