import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Book } from "./Book";

export const Carousel = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal={true}
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.empty8}></View>
        <View style={styles.item}>
          <Book></Book>
        </View>
        <View style={styles.item}>
          <Book></Book>
        </View>
        <View style={styles.item}>
          <Book></Book>
        </View>
        <View style={styles.item}>
          <Book></Book>
        </View>
        <View style={styles.item}>
          <Book></Book>
        </View>
        <View style={styles.empty32}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontFamily: "Cochin-Bold",
    color: "#343434",
  },
  wrapper: {
    overflow: "scroll",
    marginTop: 24,
  },
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingRight: 32,
  },
  item: {
    marginLeft: 24,
  },
  empty32: {
    width: 32,
  },
  empty8: {
    width: 8,
  },
});
