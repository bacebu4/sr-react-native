import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Constants from "expo-constants";
import { Title } from "./Title";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "./store/NotesStore";
import { TextGray } from "./components/TextGray";

export const Navbar = observer(({ title, handleClick }) => {
  const NotesStore = useContext(NotesStoreContext);

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <Title type="big" title={title} />
        <TouchableOpacity onPress={handleClick}>
          <Image style={styles.icon} source={require("./avatar.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.subbar}>
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
        ></ProgressCircle>
        {!NotesStore.info.reviewed ? (
          <>
            <Text style={styles.info}>Review Process Pending</Text>
          </>
        ) : (
          <>
            <Text style={styles.info}>Today's Review</Text>
            <TextGray ml={16}>Goal achieved</TextGray>
          </>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    paddingBottom: 16,
  },
  navbar: {
    flexDirection: "row",
    marginTop: Constants.statusBarHeight + 40,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  icon: {
    width: 44,
    height: 44,
  },
  subbar: {
    marginTop: 4,
    paddingLeft: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    marginLeft: 16,
    fontWeight: "600",
    color: "#CCA9F9",
  },
});
