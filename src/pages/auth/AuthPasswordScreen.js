import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { useMessage } from "../../hooks/message.hook";
import { MainButton } from "../../components/MainButton";
import { BaseInput } from "../../components/BaseInput";

export const AuthPasswordScreen = observer(({ navigation }) => {
  const [password, onPassword] = useState("123456");
  const message = useMessage();

  const NotesStore = useContext(NotesStoreContext);

  const handleSubmit = async () => {
    try {
      await NotesStore.register(password);
    } catch (error) {
      message(error.message);
    }
  };
  return (
    <MainContainer>
      <Container>
        <NavbarTop title="Password" handleClick={() => navigation.goBack()} />

        <BaseInput
          mt={32}
          autoFocus
          onChangeText={(text) => onPassword(text)}
          value={password}
          secureTextEntry
          onSubmitEditing={handleSubmit}
        />

        <View style={styles.center}>
          <View style={styles.button}>
            <MainButton
              title="Register"
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
  button: {
    marginTop: 74,
    width: 180,
  },
  center: {
    alignItems: "center",
  },
});
