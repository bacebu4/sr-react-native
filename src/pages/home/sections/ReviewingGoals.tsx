import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ProgressCircle from "react-native-progress-circle";
import { BaseText } from "../../../components/BaseText";
import { Container } from "../../../components/grid/Container";
import { MainButton } from "../../../components/MainButton";
import { Title } from "../../../components/Title";
import { WeekView } from "../../../components/WeekView";
import { Info, Maybe } from "../../../generated/graphql";
import { GRAY_COLOR, PURPLE_COLOR } from "../../../utils/colors";
import { UiStoreContext } from "../../../utils/UiStore";

type ReviewingGoalsProps = {
  info:
    | Maybe<
        {
          __typename?: "Info" | undefined;
        } & Pick<
          Info,
          | "reviewAmount"
          | "email"
          | "latestReviewDate"
          | "streakBeginningDate"
          | "missed"
          | "reviewed"
          | "streak"
          | "id"
        >
      >
    | undefined;
  dailyNotesIds: Maybe<Maybe<string>[]> | undefined;
};

export const ReviewingGoals: React.FC<ReviewingGoalsProps> = observer(
  ({ info, dailyNotesIds }) => {
    const { t } = useTranslation();
    const UiStore = useContext(UiStoreContext);
    const navigation = useNavigation();

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
              info?.reviewed
                ? 100
                : (UiStore.currentReviewIndex / dailyNotesIds?.length!) * 100
            }
            radius={120}
            borderWidth={32}
            color={PURPLE_COLOR}
            shadowColor="#d7d7d7"
            bgColor="#fff"
          >
            <BaseText isSerif isBold fz={40} shouldNotTranslate>
              {info?.reviewed
                ? info?.reviewAmount!
                : UiStore.currentReviewIndex}{" "}
              / {info?.reviewAmount!}
            </BaseText>
          </ProgressCircle>
        </Container>

        <Container
          style={{ flexDirection: "row", justifyContent: "center" }}
          isCentered
          mt={32}
        >
          <BaseText isSerif fz={24}>
            You've been on the track for
          </BaseText>
          <BaseText isSerif fz={24}>
            {" "}
          </BaseText>
          <BaseText isSerif fz={24}>
            {info?.streak}
          </BaseText>
          <BaseText isSerif fz={24}>
            {" "}
          </BaseText>
          <BaseText isSerif fz={24}>
            {info?.streak === 1 ? "day" : "days"}
          </BaseText>
        </Container>

        <WeekView info={info} />

        <Container mt={32} pb={64} isCentered>
          <MainButton
            onPress={() => navigation.navigate("Review")}
            title="Start review"
            isDark
          />
        </Container>
      </>
    );
  }
);
