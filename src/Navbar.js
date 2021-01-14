import React, { useContext } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Constants from "expo-constants";
import { Title } from "./components/Title";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "./store/NotesStore";
import { TextGray } from "./components/TextGray";
import { TText } from "./components/TText";
import { Container } from "./components/grid/Container";

export const Navbar = observer(({ title, handleClick }) => {
  const NotesStore = useContext(NotesStoreContext);

  return (
    <>
      <Container
        isRow
        mt={Constants.statusBarHeight + 40}
        style={{ justifyContent: "space-between", alignItems: "baseline" }}
      >
        <Title type="big" title={title} />
        <TouchableOpacity onPress={handleClick}>
          <Image style={styles.icon} source={require("./assets/avatar.png")} />
        </TouchableOpacity>
      </Container>
      <Container
        isRow
        mt={4}
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: 4,
        }}
      >
        <ProgressCircle
          percent={
            NotesStore.info.reviewed
              ? 100
              : (NotesStore.info.current / NotesStore.amount) * 100
          }
          radius={10}
          borderWidth={4}
          color="#CCA9F9"
          shadowColor="#d7d7d7"
          bgColor="#fff"
        />

        {!NotesStore.info.reviewed ? (
          <TText style={styles.info}>Review Process Pending</TText>
        ) : (
          <>
            <TText style={styles.info}>Today's Review</TText>
            <TextGray ml={8}>
              <TText>Goal achieved</TText>
            </TextGray>
          </>
        )}
      </Container>
      <Container hasBorder mt={16} />
    </>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 44,
    height: 44,
  },
  info: {
    marginLeft: 16,
    fontWeight: "600",
    color: "#CCA9F9",
  },
});
