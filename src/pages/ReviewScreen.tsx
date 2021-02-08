import React, { useContext, useMemo, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import { NavbarSecondary } from "../components/NavbarSecondary";
import { SceneRendererProps, TabView } from "react-native-tab-view";
import { observer } from "mobx-react-lite";
import { ReviewTabScreen } from "./review/ReviewTabScreen";
import { ReviewFinalScreen } from "./review/ReviewFinalScreen";
import * as Haptics from "expo-haptics";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import {
  useDailyNotesIdsQuery,
  useUpdateReviewHistoryMutation,
  useInfoQuery,
} from "../generated/graphql";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "src/stacks/HomeStackScreen";
import { UiStoreContext } from "../utils/UiStore";

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
  const [index, setIndex] = React.useState(0);

  const handleNextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  if (fetching) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <Text>Loading...</Text>
        </Container>
      </MainContainer>
    );
  }

  useEffect(() => {
    AMOUNT = Number(data?.dailyNotesIds?.length);
  }, []);

  const generateRoutes = useMemo(() => {
    const initialRoutes = [];

    for (let i = 1; i <= data?.dailyNotesIds?.length!; i++) {
      initialRoutes.push({
        key: String(i),
        title: String(i),
        noteId: data?.dailyNotesIds![i - 1]
          ? (data!.dailyNotesIds![i - 1]! as string)
          : "",
      });
    }
    initialRoutes.push({
      key: String(data?.dailyNotesIds?.length! + 1),
      title: String(data?.dailyNotesIds?.length! + 1),
      noteId: "",
    });
    return initialRoutes;
  }, [data?.dailyNotesIds?.length, fetching]);

  useEffect(() => {
    if (index === data?.dailyNotesIds?.length) {
      Haptics.notificationAsync("success" as Haptics.NotificationFeedbackType);

      if (!resultInfo.data?.info?.reviewed) {
        updateReviewHistory();
      }
    }

    if (index > maxIndex) {
      maxIndex = index;
      UiStore.setCurrentReviewIndex(index);
    }
  }, [index]);

  const [routes] = React.useState(generateRoutes);

  return (
    <MainContainer>
      <NavbarSecondary
        title={"Review mode"}
        handleNext={handleNextSlide}
        handleClick={() => navigation.navigate("Home")}
        index={AMOUNT - index}
        amount={AMOUNT}
      />
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
