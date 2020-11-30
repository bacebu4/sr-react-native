import React, { useContext, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";

export const AuthEmailScreen = observer(({ navigation }) => {
  const [email, onEmail] = useState("v@mail.ru");

  const NotesStore = useContext(NotesStoreContext);

  const handleSubmit = () => {
    navigation.navigate("AuthPassword");
    NotesStore.setEmail(email);
  };

  return (
    <MainContainer>
      <Container>
        <NavbarTop
          title="Email"
          handleClick={() => navigation.goBack()}
          handleNext={handleSubmit}
        ></NavbarTop>
        <TextInput
          autoFocus
          autoCompleteType="email"
          style={styles.input}
          onChangeText={(text) => onEmail(text)}
          value={email}
          keyboardType="email-address"
          onSubmitEditing={handleSubmit}
        />
      </Container>
    </MainContainer>
  );
});

const styles = StyleSheet.create({
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
});
