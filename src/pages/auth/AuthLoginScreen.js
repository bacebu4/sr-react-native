import React, { useContext } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { MainButton } from "../../MainButton";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";

export const AuthLoginScreen = observer(({ navigation }) => {
  const [email, onEmail] = React.useState("v@mail.ru");
  const [password, onPassword] = React.useState("123456");

  const NotesStore = useContext(NotesStoreContext);

  const handleSubmit = () => {
    NotesStore.login(email, password);
  };
  return (
    <View style={styles.container}>
      <NavbarTop
        title="Log In"
        handleClick={() => navigation.goBack()}
      ></NavbarTop>
      <Text style={styles.heading}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <Text style={styles.heading}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onPassword(text)}
        value={password}
        secureTextEntry
      />
      <View style={styles.center}>
        <View style={styles.button}>
          <MainButton
            title="Log In"
            clickAction={handleSubmit}
            loading={NotesStore.isLoginLoading}
          ></MainButton>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: 32,
    paddingRight: 32,
    flex: 1,
    backgroundColor: "white",
  },
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
  image: {
    width: 315,
    height: 250,
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
  mt: {
    marginTop: 32,
  },
  mts: {
    marginTop: 16,
  },
  mtx: {
    marginTop: 44,
  },
  mb: {
    marginBottom: 150,
  },
  center: {
    alignItems: "center",
  },
});
