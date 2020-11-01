import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Tag } from "../../Tag";
import { Title } from "../../Title";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../store/UiStore";

export const ChooseScreen = observer(() => {
  const [showAdd, setShowAdd] = useState(false);
  const [email, onEmail] = React.useState("some@some.com");
  const UiStore = React.useContext(UiStoreContext);

  const handleAdd = () => {
    setShowAdd(true);
    UiStore.setShowAddSheet(true);
    UiStore.addRef.current.snapTo(0);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: showAdd ? 650 : 400,
      }}
    >
      <View style={styles.center}>
        <View style={styles.topBar}></View>
      </View>
      <View style={{ ...styles.container, ...styles.mts, ...styles.title }}>
        <View></View>
        <Title type="small" title={"Choose from existing"}></Title>
        <TouchableOpacity onPress={handleAdd}>
          <Image
            style={styles.icon}
            source={require("../../assets/smallPlus.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Tag title="Life"></Tag>
          </View>
          <View style={styles.tag}>
            <Tag hue={200} title="Success"></Tag>
          </View>
          <View style={styles.tag}>
            <Tag hue={300} title="Important"></Tag>
          </View>
        </View>
      </View>
      {UiStore.showAddSheet ? (
        <TextInput
          style={styles.input}
          onChangeText={(text) => onEmail(text)}
          value={email}
          keyboardType="email-address"
          autoFocus
        />
      ) : (
        <View></View>
      )}
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
  icon: {
    width: 24,
    height: 24,
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
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    paddingBottom: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    marginRight: 16,
    marginTop: 24,
  },
  input: {
    height: 40,
    backgroundColor: "#e5e5e5",
    borderRadius: 4,
    color: "#343434",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
});
