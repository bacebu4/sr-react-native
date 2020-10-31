import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card } from "../../Card";
import { Title } from "../../Title";
import { Tag } from "../../Tag";
import { Comment } from "../../Comment";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import ActionSheet from "react-native-actionsheet";

export const ReviewTabScreen = observer(({ noteIndex }) => {
  const NotesStore = useContext(NotesStoreContext);
  const note = NotesStore.highlights[noteIndex - 1];
  const actionAddRef = React.useRef(null);

  const showAddSheet = () => {
    actionAddRef.current.show();
  };

  return (
    <>
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
          {/* <View style={styles.line}>
          <Title title="Your tags:" type="small"></Title>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require("../../assets/plus.png")}
            ></Image>
          </TouchableOpacity>
        </View>

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
        </View> */}

          <View style={styles.biggerAdd}>
            <TouchableOpacity onPress={showAddSheet}>
              <Image
                style={styles.imageBigger}
                source={require("../../assets/bigPlus.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ActionSheet
        ref={actionAddRef}
        title="What you want to add?"
        options={["Add comment", "Add tag", "Cancel"]}
        cancelButtonIndex={2}
        onPress={(index) => {
          /* do something */
        }}
      />
    </>
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
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 24,
    height: 24,
  },
  imageBigger: {
    width: 40,
    height: 40,
  },
  biggerAdd: {
    alignItems: "center",
    marginTop: 32,
  },
});
