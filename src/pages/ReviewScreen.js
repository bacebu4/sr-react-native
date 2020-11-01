import React, { useContext, useMemo, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { NavbarSecondary } from "../NavbarSecondary";
import { TabView } from "react-native-tab-view";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";
import { ReviewTabScreen } from "./review/ReviewTabScreen";
import { ReviewFinalScreen } from "./review/ReviewFinalScreen";

let AMOUNT = 1;

const renderScene = ({ route, jumpTo }) => {
  if (Number(route.key <= AMOUNT)) {
    return <ReviewTabScreen jumpTo={jumpTo} noteIndex={Number(route.key)} />;
  }
  return <ReviewFinalScreen jumpTo={jumpTo} />;
};

const initialLayout = { width: Dimensions.get("window").width };

export const ReviewScreen = observer(({ navigation }) => {
  const NotesStore = useContext(NotesStoreContext);

  useEffect(() => {
    AMOUNT = NotesStore.amount;
  }, []);

  const generateRoutes = useMemo(() => {
    const initialRoutes = [];
    for (let i = 1; i <= NotesStore.amount; i++) {
      initialRoutes.push({ key: i, title: i });
    }
    initialRoutes.push({
      key: NotesStore.amount + 1,
      title: NotesStore.amount + 1,
    });
    return initialRoutes;
  }, [NotesStore.amount]);

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
          index={NotesStore.amount - index}
          amount={NotesStore.amount}
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
});
