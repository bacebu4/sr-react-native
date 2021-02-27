import React, { useContext, useState, useRef } from "react";
import { TextInput } from "react-native";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { useMessage } from "../../hooks/message.hook";
import { MainButton } from "../../components/MainButton";
import { BaseInput } from "../../components/BaseInput";
import { AuthStackParamList } from "src/stacks/AuthStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { UiStoreContext } from "../../utils/UiStore";
import { useLoginMutation } from "../../generated/graphql";
import { BaseText } from "../../components/BaseText";

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
        await UiStore.login(result.data?.login);
      } else {
        console.log(result);
        throw new Error("You got it wrong!");
      }
    } catch (error) {
      message(error.message);
    }
  };

  return (
    <MainContainer>
      <NavbarTop title="Log In" handleClick={() => navigation.goBack()} />
      <Container>
        <BaseText fz={20} isBold mt={22}>
          Email
        </BaseText>

        <BaseInput
          mt={8}
          autoFocus
          onChangeText={(text) => onEmail(text)}
          value={email}
          keyboardType="email-address"
          onSubmitEditing={() => passwordInput?.current?.focus()}
        />
        <BaseText fz={20} isBold mt={22}>
          Password
        </BaseText>
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
