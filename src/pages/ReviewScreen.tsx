import React, { useContext, useMemo, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import { NavbarSecondary } from "../components/NavbarSecondary";
import { Route, SceneRendererProps, TabView } from "react-native-tab-view";
import { observer } from "mobx-react-lite";
import { ReviewTabScreen } from "./review/ReviewTabScreen";
import { ReviewFinalScreen } from "./review/ReviewFinalScreen";
import * as Haptics from "expo-haptics";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import {
  useDailyNotesIdsQuery,
  useInfoQuery,
  useUpdateReviewHistoryMutation,
} from "../generated/graphql";
import { format } from "date-fns";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "src/stacks/HomeStackScreen";
import { UiStoreContext } from "../store/UiStore";

let AMOUNT = 1;
let maxIndex = 0;

const renderScene: React.FC<
  SceneRendererProps & {
    route: {
      key: any;
      title: any;
      noteId: string;
    };
  }
> = ({ route, jumpTo }) => {
  if (Number(route.key) > AMOUNT) {
    return <ReviewFinalScreen jumpTo={jumpTo} />;
  }

  return <ReviewTabScreen jumpTo={jumpTo} noteId={route.noteId} />;
};

type Props = {
  navigation: StackNavigationProp<HomeStackParamList, "Review">;
};

export const ReviewScreen: React.FC<Props> = observer(({ navigation }) => {
  const UiStore = useContext(UiStoreContext);
  const [, updateReviewHistory] = useUpdateReviewHistoryMutation();
  const [result] = useDailyNotesIdsQuery();
  const { data, fetching } = result;
  const [resultInfo] = useInfoQuery();

  if (fetching || resultInfo.fetching) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <Text>Loading...</Text>
        </Container>
      </MainContainer>
    );
  }

  useEffect(() => {
    AMOUNT = Number(resultInfo.data?.info?.reviewAmount);
  }, []);

  const generateRoutes = useMemo(() => {
    const initialRoutes = [];

    for (let i = 1; i <= resultInfo.data?.info?.reviewAmount!; i++) {
      initialRoutes.push({
        key: i,
        title: i,
        noteId: data?.dailyNotesIds![i - 1]
          ? (data!.dailyNotesIds![i - 1]! as string)
          : "",
      });
    }
    initialRoutes.push({
      key: resultInfo.data?.info?.reviewAmount! + 1,
      title: resultInfo.data?.info?.reviewAmount! + 1,
      noteId: "",
    });
    return initialRoutes;
  }, [resultInfo.data?.info?.reviewAmount, fetching, resultInfo.fetching]);

  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    if (index === resultInfo.data?.info?.reviewAmount) {
      // @ts-ignore
      Haptics.notificationAsync("success");
    }
    if (index > maxIndex) {
      maxIndex = index;
      UiStore.setCurrentReviewIndex(index);

      if (index === resultInfo.data?.info?.reviewAmount) {
        updateReviewHistory({
          date: format(Date.now(), "yyyy-MM-dd"),
        });
      }
    }
  }, [index]);

  // @ts-ignore
  const [routes] = React.useState(generateRoutes);

  const handleNextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <MainContainer>
      <NavbarSecondary
        title={"Review mode"}
        handleNext={handleNextSlide}
        handleClick={() => navigation.navigate("Home")}
        index={AMOUNT - index}
        amount={AMOUNT}
      ></NavbarSecondary>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={() => null}
      />
    </MainContainer>
  );
});
