import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card } from "../../Card";
import { Title } from "../../Title";
import { Tag } from "../../Tag";
import { Comment } from "../../Comment";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";

export const ReviewTabScreen = observer(({ noteIndex }) => {
  const NotesStore = useContext(NotesStoreContext);
  const note = NotesStore.highlights[noteIndex - 1];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.container, ...styles.mt }}>
        <Card note={note}></Card>
      </View>

      <View style={{ ...styles.container, ...styles.mts }}>
        {note.comment_text ? (
          <>
            <View style={styles.mt}>
              <Title title="Your comment:" type="small"></Title>
            </View>

            <Comment text={note.comment_text}></Comment>
          </>
        ) : (
          <View></View>
        )}
      </View>

      <View style={{ ...styles.container, ...styles.mt, ...styles.mb }}>
        <Title title="Your tags:" type="small"></Title>
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
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
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
    marginBottom: 64,
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
