import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { MainButton } from "../../MainButton";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";

export const AuthPasswordScreen = observer(({ navigation }) => {
  const [password, onPassword] = useState("123456");

  const NotesStore = useContext(NotesStoreContext);

  const handleSubmit = () => {
    // NotesStore.login(email, password);
    NotesStore.register(password);
  };
  return (
    <MainContainer>
      <Container>
        <NavbarTop
          title="Password"
          handleClick={() => navigation.goBack()}
        ></NavbarTop>
        <TextInput
          autoFocus
          style={styles.input}
          onChangeText={(text) => onPassword(text)}
          value={password}
          secureTextEntry
          onSubmitEditing={handleSubmit}
        />

        <View style={styles.center}>
          <View style={styles.button}>
            <MainButton
              title="Register"
              clickAction={handleSubmit}
              loading={NotesStore.isLoginLoading}
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
    marginTop: 32,
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
