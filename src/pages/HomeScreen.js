import React, { useContext } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { Card } from "../Card";
import { Navbar } from "../Navbar";
import { MainButton } from "../MainButton";
import Animated from "react-native-reanimated";
import { Title } from "../Title";
import { Carousel } from "../Carousel";
import { SeeAll } from "../SeeAll";
import { Tag } from "../Tag";
import { UiStoreContext } from "../store/UiStore";
import { NotesStoreContext } from "../store/NotesStore";
import { observer } from "mobx-react-lite";

export const HomeScreen = observer(({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    NotesStore.fetchHighlights().then(() => setRefreshing(false));
  }, []);

  const UiStore = useContext(UiStoreContext);
  const NotesStore = useContext(NotesStoreContext);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Navbar
            title="Book stash"
            handleClick={() => UiStore.settingsRef.current.snapTo(0)}
          ></Navbar>
        </View>

        <View style={{ ...styles.mt, ...styles.container }}>
          {NotesStore.highlights.length ? (
            <>
              <Card note={NotesStore.highlights[0]} />
              <View
                style={{ ...styles.mt, ...styles.container, ...styles.center }}
              >
                <MainButton
                  clickAction={() => navigation.navigate("Review")}
                ></MainButton>
              </View>
            </>
          ) : (
            <>
              <View style={{ ...styles.mt, ...styles.center }}>
                <Image
                  style={styles.image}
                  source={require("../assets/empty_main.png")}
                ></Image>
                <Text style={styles.text}>No highlights added yet</Text>
                <View style={styles.mt}>
                  <MainButton
                    clickAction={() => navigation.navigate("Review")}
                    title="Learn how to add"
                  ></MainButton>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Latest reads */}
        {NotesStore.latestBooks.length ? (
          <>
            <View style={{ ...styles.mt, ...styles.container }}>
              <Title title="Latest reads"></Title>
            </View>
            <Carousel></Carousel>
            <View style={{ ...styles.container, ...styles.border }}></View>
            <View style={{ ...styles.mts, ...styles.container }}>
              <SeeAll></SeeAll>
            </View>
          </>
        ) : (
          <>
            <View></View>
          </>
        )}

        {/* Review by tags */}
        {NotesStore.tags.length ? (
          <>
            <View style={{ ...styles.mtx, ...styles.container }}>
              <Title title="Review by tags"></Title>
              <View style={styles.tagContainer}>
                {NotesStore.tags.map((tag) => {
                  return (
                    <View style={styles.tag} key={tag.tag_id}>
                      <Tag title={tag.tag_name} hue={tag.hue}></Tag>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{ ...styles.container, ...styles.border }}></View>
            <View style={{ ...styles.mts, ...styles.mb, ...styles.container }}>
              <SeeAll></SeeAll>
            </View>
          </>
        ) : (
          <>
            <View></View>
          </>
        )}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
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
    marginBottom: 150,
  },
  center: {
    alignItems: "center",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    marginTop: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    marginRight: 16,
    marginTop: 24,
  },
  image: {
    width: 186,
    height: 173,
  },
  text: {
    color: "#B0AFAF",
    marginTop: 32,
  },
});
