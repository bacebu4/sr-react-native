import React, { useContext, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  Text,
  ActivityIndicator,
} from "react-native";
import { Navbar } from "../components/Navbar";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { SettingsModal } from "./settings/SettingsModal";
import { MainHighlight } from "../components/MainHighlight";
import { LatestBooks } from "../components/LatestBooks";
import { useHomeScreenQuery } from "../generated/graphql";
import { LatestTags } from "../components/LatestTags";
import { ReviewingGoals } from "./home/sections/ReviewingGoals";
import gql from "graphql-tag";
import { UiStoreContext } from "../utils/UiStore";

export const HOME_SCREEN_QUERY = gql`
  query HomeScreen {
    info {
      reviewAmount
      email
      latestReviewDate
      streakBeginningDate
      missed
      reviewed
      streak
      id
    }
    dailyNotesIds
    latestBooks {
      id
      title
      author
    }
    tags(type: "latest") {
      id
      name
      hue
    }
  }
`;

export const HomeScreen = () => {
  const UiStore = useContext(UiStoreContext);
  const [refreshing, setRefreshing] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [result, reexecuteHomeScreenQuery] = useHomeScreenQuery();
  const { data, error } = result;

  const closeSettings = () => {
    setModalSettings(false);
  };

  const openSettings = () => {
    setModalSettings(true);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await reexecuteHomeScreenQuery({ requestPolicy: "network-only" });
    setRefreshing(false);
  }, []);

  if (
    error?.graphQLErrors.length &&
    error?.graphQLErrors[0]?.message === "invalid user"
  ) {
    UiStore.logout();
  }

  if (error) {
    return (
      <Container isCentered mt={400}>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (data) {
    return (
      <>
        <SettingsModal
          modalState={modalSettings}
          setModalState={setModalSettings}
          handleDone={closeSettings}
        />

        <MainContainer>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Navbar
              info={data?.info}
              dailyNotesIds={data?.dailyNotesIds}
              title="Book stash"
              handleClick={openSettings}
            />

            <MainHighlight
              noteId={
                data && data.dailyNotesIds?.length
                  ? data.dailyNotesIds[0]
                  : undefined
              }
            />

            <LatestBooks latestBooks={data.latestBooks} />

            <LatestTags tags={data.tags} />

            <ReviewingGoals
              info={data?.info}
              dailyNotesIds={data?.dailyNotesIds}
            />
          </ScrollView>
        </MainContainer>
      </>
    );
  }

  return (
    <Container isCentered mt={400}>
      <ActivityIndicator size="large" />
    </Container>
  );
};
