import React, { useContext, useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { MainButton } from "../../MainButton";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { useMessage } from "../../hooks/message.hook";

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
        <TextInput
          autoFocus
          style={styles.input}
          onChangeText={(text) => onEmail(text)}
          value={email}
          keyboardType="email-address"
          onSubmitEditing={() => passwordInput.current.focus()}
        />
        <Text style={styles.heading}>Password</Text>
        <TextInput
          ref={passwordInput}
          style={styles.input}
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
  input: {
    height: 38,
    backgroundColor: "#eee",
    borderRadius: 10,
    color: "#343434",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    fontSize: 16,
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
