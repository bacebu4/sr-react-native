import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Book = ({ book }) => {
  const navigation = useNavigation();
  const { book_title: title, author_full_name: author, book_id } = book;

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigation.navigate("ByBook", { book_id })}
    >
      <Image source={require("./book.png")} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.author} numberOfLines={2}>
        {author}
      </Text>
    </TouchableOpacity>
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
