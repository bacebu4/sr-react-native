import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Book as BookType } from "src/generated/graphql";
import { BaseImage } from "./BaseImage";
import { BLACK_COLOR } from "../utils/colors";

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
      <BaseImage br={5} w={86} h={108} source={require("../assets/book.png")} />
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
    color: BLACK_COLOR,
  },
  author: {
    fontSize: 16,
    fontFamily: "Cochin",
    color: "#B0AFAF",
  },
});
