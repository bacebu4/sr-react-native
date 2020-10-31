import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MainButton } from "../MainButton";
import { Title } from "../Title";
import { observer } from "mobx-react-lite";
import { AuthStoreContext } from "../store/AuthStore";
import { UiStoreContext } from "../store/UiStore";

export const SettingsScreen = observer(() => {
  const AuthStore = useContext(AuthStoreContext);
  const UiStore = useContext(UiStoreContext);

  const handleLogout = () => {
    AuthStore.logoutUser();
    UiStore.setShowSettingsSheet(false);
  };

  const closeSheet = () => {
    UiStore.settingsRef.current.snapTo(1);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: 650,
      }}
    >
      <View style={styles.center}>
        <View style={styles.topBar}></View>
      </View>
      <View style={{ ...styles.container, ...styles.mt, ...styles.title }}>
        <Title title={"Account preferences"}></Title>
        <TouchableOpacity onPress={closeSheet}>
          <Text style={styles.link}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <View style={styles.button}>
          <MainButton
            title="Log Out"
            loading={AuthStore.isLoginLoading}
            clickAction={handleLogout}
          ></MainButton>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
  button: {
    marginTop: 74,
    width: 180,
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
