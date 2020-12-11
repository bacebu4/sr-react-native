import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BookType } from "../types";

interface Props {
  book: BookType;
}

export const Book: React.FC<Props> = ({ book }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() =>
        navigation.navigate("By", {
          id: book.id,
          name: book.title,
          type: "Book",
        })
      }
    >
      <Image style={styles.cover} source={require("../book.png")} />
      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
      <Text style={styles.author} numberOfLines={2}>
        {book.author}
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
  cover: {
    borderRadius: 5,
  },
});
