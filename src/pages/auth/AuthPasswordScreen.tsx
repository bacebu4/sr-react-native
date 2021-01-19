import React, { useState } from "react";
import { NavbarTop } from "../../components/NavbarTop";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { useMessage } from "../../hooks/message.hook";
import { MainButton } from "../../components/MainButton";
import { BaseInput } from "../../components/BaseInput";
import { RouteProp } from "@react-navigation/native";
import { AuthStackParamList } from "src/stacks/AuthStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRegisterMutation } from "src/generated/graphql";

interface Props {
  route: RouteProp<AuthStackParamList, "AuthPassword">;
  navigation: StackNavigationProp<AuthStackParamList, "AuthLogin">;
}

export const AuthPasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const [password, onPassword] = useState("123456");
  const message = useMessage();
  const [registerResult, register] = useRegisterMutation();

  const handleSubmit = async () => {
    try {
      const result = await register({ email: route.params.email, password });

      if (!result.data?.register) {
        throw new Error("You got it wrong! Try again");
      }
    } catch (error) {
      message(error.message);
      navigation.navigate("AuthEmail");
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

        <Container mt={94} style={{ marginHorizontal: 80 }}>
          <MainButton
            title="Register"
            onPress={handleSubmit}
            isLoading={registerResult.fetching}
          />
        </Container>
      </Container>
    </MainContainer>
  );
};
