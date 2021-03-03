import React, { useContext } from "react";
import { ActivityIndicator, Text } from "react-native";
import { Container } from "../../../components/grid/Container";
import { Title } from "../../../components/Title";
import { useTranslation } from "react-i18next";
import { GRAY_COLOR, PURPLE_COLOR } from "../../../utils/colors";
import { BaseText } from "../../../components/BaseText";
import {
  useInfoQuery,
  useDailyNotesIdsQuery,
} from "../../../generated/graphql";
import ProgressCircle from "react-native-progress-circle";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../../utils/UiStore";
import { MainButton } from "../../../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import { WeekView } from "../../../components/WeekView";

export const ReviewingGoals: React.FC = observer(() => {
  const [result] = useInfoQuery();
  const [
    {
      data: dailyNotesData,
      fetching: dailyNotesFetching,
      error: dailyNotesError,
    },
  ] = useDailyNotesIdsQuery();
  const { data, error, fetching } = result;
  const { t } = useTranslation();
  const UiStore = useContext(UiStoreContext);
  const navigation = useNavigation();

  if (error || dailyNotesError) {
    return (
      <Container isCentered mt={400}>
        <Text>{error?.message}</Text>
      </Container>
    );
  }

  if (fetching || dailyNotesFetching) {
    return (
      <Container isCentered mt={400}>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <>
      <Container
        mt={64}
        pb={34}
        isCentered
        style={{
          backgroundColor: "white",
          elevation: 10,
          shadowColor: GRAY_COLOR,
          //@ts-ignore
          shadowOffset: { height: -8 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
        }}
        hasNoMargin
      />
      <Container isCentered>
        <Title title={t("Reviewing Goals")} />
        <BaseText color="gray" mt={16} isCentered style={{ maxWidth: 350 }}>
          Dontforgetwhatyouread
        </BaseText>
      </Container>

      <Container mt={32} isCentered>
        <ProgressCircle
          percent={
            data?.info?.reviewed
              ? 100
              : (UiStore.currentReviewIndex /
                  dailyNotesData?.dailyNotesIds?.length!) *
                100
          }
          radius={120}
          borderWidth={32}
          color={PURPLE_COLOR}
          shadowColor="#d7d7d7"
          bgColor="#fff"
        >
          <BaseText isSerif isBold fz={40} shouldNotTranslate>
            {data?.info?.reviewed
              ? data?.info?.reviewAmount!
              : UiStore.currentReviewIndex}{" "}
            / {data?.info?.reviewAmount!}
          </BaseText>
        </ProgressCircle>
      </Container>

      <Container isCentered mt={32}>
        <BaseText
          isSerif
          fz={24}
          isCentered
          style={{ maxWidth: 300 }}
          shouldNotTranslate
        >
          You have {data?.info?.streak} days in a row
        </BaseText>
      </Container>

      <WeekView />

      <Container mt={32} pb={64} isCentered>
        <MainButton
          onPress={() => navigation.navigate("Review")}
          title="Start review"
          isDark
        />
      </Container>
    </>
  );
});
