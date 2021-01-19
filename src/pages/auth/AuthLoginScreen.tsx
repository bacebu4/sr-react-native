import React, { useContext, useState, useRef } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { useMessage } from "../../hooks/message.hook";
import { MainButton } from "../../components/MainButton";
import { BaseInput } from "../../components/BaseInput";
import { AuthStackParamList } from "src/stacks/AuthStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { UiStoreContext } from "../../store/UiStore";
import { useLoginMutation } from "../../generated/graphql";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "AuthLogin">;
}

export const AuthLoginScreen: React.FC<Props> = observer(({ navigation }) => {
  const [email, onEmail] = useState("vasua14735@icloud.com");
  const [password, onPassword] = useState("123456");
  const passwordInput = useRef<TextInput>(null);
  const message = useMessage();
  const [loginResult, login] = useLoginMutation();

  const UiStore = useContext(UiStoreContext);

  const handleSubmit = async () => {
    try {
      const result = await login({ email, password });

      if (result.data?.login) {
        UiStore.setToken(result.data?.login);
        UiStore.setLogged(true);
      } else {
        throw new Error("You got it wrong!");
      }
    } catch (error) {
      message(error.message);
    }
  };

  return (
    <MainContainer>
      <Container>
        <NavbarTop title="Log In" handleClick={() => navigation.goBack()} />
        <Text style={styles.heading}>Email</Text>

        <BaseInput
          mt={8}
          autoFocus
          onChangeText={(text) => onEmail(text)}
          value={email}
          keyboardType="email-address"
          onSubmitEditing={() => passwordInput?.current?.focus()}
        />
        <Text style={styles.heading}>Password</Text>
        <BaseInput
          mt={8}
          refProp={passwordInput}
          onChangeText={(text) => onPassword(text)}
          value={password}
          secureTextEntry
          onSubmitEditing={handleSubmit}
        />

        <Container mt={94} style={{ marginHorizontal: 80 }}>
          <MainButton
            title="Log In"
            onPress={handleSubmit}
            isLoading={loginResult.fetching}
          />
        </Container>
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
});
