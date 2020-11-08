import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { MainButton } from "../../MainButton";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";

export const AuthEmailScreen = observer(({ navigation }) => {
  const [email, onEmail] = useState("v@mail.ru");

  const NotesStore = useContext(NotesStoreContext);

  const handleSubmit = () => {
    // NotesStore.login(email, password);
  };
  return (
    <MainContainer>
      <Container>
        <NavbarTop
          title="Email"
          handleClick={() => navigation.goBack()}
        ></NavbarTop>
        {/* <Text style={styles.heading}>Email</Text> */}
        <TextInput
          autoFocus
          style={styles.input}
          onChangeText={(text) => onEmail(text)}
          value={email}
          keyboardType="email-address"
          onSubmitEditing={handleSubmit}
        />

        <View style={styles.center}>
          <View style={styles.button}>
            <MainButton
              title="Next"
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
