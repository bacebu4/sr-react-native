import React, { useState } from "react";
import { NavbarTop } from "../../components/NavbarTop";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { BaseInput } from "../../components/BaseInput";
import { AuthStackParamList } from "src/stacks/AuthStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "AuthEmail">;
}

export const AuthEmailScreen: React.FC<Props> = ({ navigation }) => {
  const [email, onEmail] = useState("v@mail.ru");

  const handleSubmit = () => {
    navigation.navigate("AuthPassword", { email });
  };

  return (
    <MainContainer>
      <Container>
        <NavbarTop
          title="Email"
          handleClick={() => navigation.goBack()}
          handleNext={handleSubmit}
        />

        <BaseInput
          mt={32}
          autoFocus
          autoCompleteType="email"
          onChangeText={(text) => onEmail(text)}
          value={email}
          keyboardType="email-address"
          onSubmitEditing={handleSubmit}
        />
      </Container>
    </MainContainer>
  );
};
