import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Book as BookType, Maybe } from "src/generated/graphql";
import { Book } from "./Book";

interface Props {
  books:
    | Maybe<
        { __typename?: "Book" | undefined } & Pick<
          BookType,
          "id" | "title" | "author"
        >
      >[]
    | null
    | undefined;
}

export const Carousel: React.FC<Props> = ({ books }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal={true}
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.empty8}></View>

        {books!.map((book) => {
          return (
            <View style={styles.item} key={book!.id}>
              <Book
                book={{
                  title: book!.title,
                  author: book!.author,
                  id: book!.id,
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
