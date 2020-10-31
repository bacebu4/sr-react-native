import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Tag } from "../../Tag";
import { Title } from "../../Title";

export const ChooseScreen = () => {
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
      <View style={{ ...styles.container, ...styles.mts, ...styles.title }}>
        <View></View>
        <Title type="small" title={"Choose from existing"}></Title>
        <TouchableOpacity>
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
    </View>
  );
};

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
});
