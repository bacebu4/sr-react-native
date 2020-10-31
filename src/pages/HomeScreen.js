import React, { useContext } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Text,
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
            <Card note={NotesStore.highlights[0]} />
          ) : (
            <Text>nothing</Text>
          )}
        </View>

        <View style={{ ...styles.mt, ...styles.container, ...styles.center }}>
          <MainButton
            clickAction={() => navigation.navigate("Review")}
          ></MainButton>
        </View>

        <View style={{ ...styles.mt, ...styles.container }}>
          <Title title="Latest reads"></Title>
        </View>
        <Carousel></Carousel>
        <View style={{ ...styles.container, ...styles.border }}></View>
        <View style={{ ...styles.mts, ...styles.container }}>
          <SeeAll></SeeAll>
        </View>

        <View style={{ ...styles.mtx, ...styles.container }}>
          <Title title="Review by tags"></Title>
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
        <View style={{ ...styles.container, ...styles.border }}></View>
        <View style={{ ...styles.mts, ...styles.mb, ...styles.container }}>
          <SeeAll></SeeAll>
        </View>
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
});
