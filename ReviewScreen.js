import React, { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { Card } from "./src/Card";
import { NavbarSecondary } from "./src/NavbarSecondary";
import { Title } from "./src/Title";
import { Tag } from "./src/Tag";
import { TabView } from "react-native-tab-view";
import { Comment } from "./src/Comment";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "./src/store/NotesStore";

const FirstRoute = observer(({ noteIndex }) => {
  const NotesStore = useContext(NotesStoreContext);
  const note = NotesStore.highlights[noteIndex - 1];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.container, ...styles.mt }}>
        <Card note={note}></Card>
      </View>

      <View style={{ ...styles.container, ...styles.mt }}>
        <Title title="Your comment" type="small"></Title>
      </View>
      <View style={{ ...styles.container, ...styles.mts }}>
        <Comment></Comment>
      </View>

      <View style={{ ...styles.container, ...styles.mt, ...styles.mb }}>
        <Title title="Review by tags" type="small"></Title>
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

const renderScene = ({ route, jumpTo }) => {
  return <FirstRoute jumpTo={jumpTo} noteIndex={Number(route.key)} />;
};

const initialLayout = { width: Dimensions.get("window").width };

export const ReviewScreen = ({ navigation }) => {
  const [amount] = React.useState(3);

  const generateRoutes = useMemo(() => {
    const initialRoutes = [];
    for (let i = 1; i <= amount; i++) {
      initialRoutes.push({ key: i, title: i });
    }
    return initialRoutes;
  }, [amount]);

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState(generateRoutes);

  const handleNextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <NavbarSecondary
          title="Review mode"
          handleNext={handleNextSlide}
          handleClick={() => navigation.navigate("Home")}
          index={3 - index}
        ></NavbarSecondary>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={() => null}
      />
    </View>
  );
};

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
    marginBottom: 64,
  },
  center: {
    alignItems: "center",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    marginTop: 16,
  },
  scene: {
    flex: 1,
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
