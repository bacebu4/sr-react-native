import React, { useContext, useState } from "react";
import { NavbarTop } from "../../components/NavbarTop";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { MainContainer } from "../../components/grid/MainContainer";
import { BaseInput } from "../../components/BaseInput";

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
});
