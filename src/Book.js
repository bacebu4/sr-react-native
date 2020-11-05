import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export const Book = ({ title = "title", author = "author" }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity>
        <Image source={require("./book.png")} />
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={2}>
          {author}
        </Text>
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
