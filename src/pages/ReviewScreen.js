import React, { useContext, useMemo, useEffect } from "react";
import { Dimensions } from "react-native";
import { NavbarSecondary } from "../NavbarSecondary";
import { TabView } from "react-native-tab-view";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";
import { ReviewTabScreen } from "./review/ReviewTabScreen";
import { ReviewFinalScreen } from "./review/ReviewFinalScreen";
import * as Haptics from "expo-haptics";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { useUpdateReviewHistoryMutation } from "../generated/graphql";
import { format } from "date-fns";

let AMOUNT = 1;
let maxIndex = 0;

const renderScene = ({ route, jumpTo }) => {
  if (Number(route.key <= AMOUNT)) {
    return <ReviewTabScreen jumpTo={jumpTo} noteIndex={Number(route.key)} />;
  }
  return <ReviewFinalScreen jumpTo={jumpTo} />;
};

const initialLayout = { width: Dimensions.get("window").width };

export const ReviewScreen = observer(({ navigation }) => {
  const NotesStore = useContext(NotesStoreContext);
  const [, updateReviewHistory] = useUpdateReviewHistoryMutation();

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

  useEffect(() => {
    if (index === NotesStore.amount) {
      Haptics.notificationAsync("success");
    }
    if (index > maxIndex) {
      maxIndex = index;
      NotesStore.setCurrent(index);

      if (index === NotesStore.amount) {
        // NotesStore.setReviewed();
        updateReviewHistory({
          date: format(Date.now(), "yyyy-MM-dd"),
        });
        console.log("end");
      }
    }
  }, [index]);

  const [routes] = React.useState(generateRoutes);

  const handleNextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <MainContainer>
      <Container>
        <NavbarSecondary
          title="Review mode"
          handleNext={handleNextSlide}
          handleClick={() => navigation.navigate("Home")}
          index={NotesStore.amount - index}
          amount={NotesStore.amount}
        ></NavbarSecondary>
      </Container>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={() => null}
      />
    </MainContainer>
  );
});
