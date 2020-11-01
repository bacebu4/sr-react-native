import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Book } from "./Book";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "./store/NotesStore";

export const Carousel = observer(() => {
  const NotesStore = React.useContext(NotesStoreContext);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal={true}
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.empty8}></View>

        {NotesStore.latestBooks.length ? (
          <>
            {NotesStore.latestBooks.map((book) => {
              return (
                <View style={styles.item} key={book.book_id}>
                  <Book
                    title={book.book_title}
                    author={book.author_full_name}
                  ></Book>
                </View>
              );
            })}
          </>
        ) : (
          <>
            <Text>No books added yet</Text>
          </>
        )}

        <View style={styles.empty32}></View>
      </ScrollView>
    </View>
  );
});

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
