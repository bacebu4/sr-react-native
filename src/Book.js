import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export const Book = () => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity>
        <Image source={require("./book.png")} />
        <Text style={styles.title}>4 Hour Workweek</Text>
        <Text style={styles.author}>Tim Ferris</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 100,
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Cochin",
    color: "#343434",
  },
  author: {
    fontSize: 16,
    fontFamily: "Cochin",
    color: "#B0AFAF",
  },
});
