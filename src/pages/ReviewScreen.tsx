import React, { useContext, useMemo, useEffect } from "react";
import { Dimensions, Text } from "react-native";
// @ts-ignore
import { NavbarSecondary } from "../NavbarSecondary";
import { SceneRendererProps, TabView } from "react-native-tab-view";
import { observer } from "mobx-react-lite";
// @ts-ignore
import { NotesStoreContext } from "../store/NotesStore";
import { ReviewTabScreen } from "./review/ReviewTabScreen";
import { ReviewFinalScreen } from "./review/ReviewFinalScreen";
import * as Haptics from "expo-haptics";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import {
  useDailyNotesQuery,
  useUpdateReviewHistoryMutation,
} from "../generated/graphql";
import { format } from "date-fns";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "src/stacks/HomeStackScreen";

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

const initialLayout = { width: Dimensions.get("window").width };

type Props = {
  navigation: StackNavigationProp<HomeStackParamList, "Review">;
};

export const ReviewScreen: React.FC<Props> = observer(({ navigation }) => {
  const NotesStore = useContext(NotesStoreContext);
  const [, updateReviewHistory] = useUpdateReviewHistoryMutation();
  const [result] = useDailyNotesQuery();
  const { data, fetching } = result;

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
    // @ts-ignore
    AMOUNT = NotesStore.amount;
  }, []);

  const generateRoutes = useMemo(() => {
    const initialRoutes = [];
    // @ts-ignore
    for (let i = 1; i <= NotesStore.amount; i++) {
      initialRoutes.push({
        key: i,
        title: i,
        noteId: data?.dailyNotes![i - 1]?.id
          ? (data!.dailyNotes![i - 1]!.id! as string)
          : "",
      });
    }
    initialRoutes.push({
      // @ts-ignore
      key: NotesStore.amount + 1,
      // @ts-ignore
      title: NotesStore.amount + 1,
      noteId: "",
    });
    return initialRoutes;
    // @ts-ignore
  }, [NotesStore.amount, fetching]);

  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    // @ts-ignore
    if (index === NotesStore.amount) {
      // @ts-ignore
      Haptics.notificationAsync("success");
    }
    if (index > maxIndex) {
      maxIndex = index;
      // @ts-ignore
      NotesStore.setCurrent(index);

      // @ts-ignore
      if (index === NotesStore.amount) {
        updateReviewHistory({
          date: format(Date.now(), "yyyy-MM-dd"),
        });
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
          title={"Review mode"}
          handleNext={handleNextSlide}
          handleClick={() => navigation.navigate("Home")}
          // @ts-ignore
          index={NotesStore.amount - index}
          // @ts-ignore
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
