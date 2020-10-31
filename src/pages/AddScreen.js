import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Title } from "../Title";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../store/UiStore";

export const AddScreen = observer(() => {
  const UiStore = useContext(UiStoreContext);

  const closeSheet = () => {
    UiStore.addRef.current.snapTo(1);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: 400,
      }}
    >
      <View style={styles.center}>
        <View style={styles.topBar}></View>
      </View>
      <View style={{ ...styles.container, ...styles.mt, ...styles.title }}>
        <Title title={"Choose from existing"}></Title>
        <TouchableOpacity onPress={closeSheet}>
          <Text style={styles.link}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
  topBar: {
    marginTop: 24,
    width: 32,
    height: 5,
    backgroundColor: "#dbdbdb",
    borderRadius: 100,
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
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#CCA9F9",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
});
