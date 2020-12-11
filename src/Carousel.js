import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Book } from "./components/Book";

export const Carousel = ({ books }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal={true}
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.empty8}></View>

        {books.map((book) => {
          return (
            <View style={styles.item} key={book.book_id}>
              <Book
                book={{
                  title: book.book_title,
                  author: book.author_full_name,
                  id: book.book_id,
                }}
              ></Book>
            </View>
          );
        })}

        <View style={styles.empty32}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
