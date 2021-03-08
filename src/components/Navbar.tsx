import Constants from "expo-constants";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { GestureResponderEvent } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { Info, Maybe } from "../generated/graphql";
import { PURPLE_COLOR } from "../utils/colors";
import { UiStoreContext } from "../utils/UiStore";
import { BaseImage } from "./BaseImage";
import { BaseText } from "./BaseText";
import { Container } from "./grid/Container";
import { Title } from "./Title";

interface Props {
  handleClick: ((event: GestureResponderEvent) => void) | undefined;
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
}

export const Navbar: React.FC<Props> = observer(
  ({ handleClick, info, dailyNotesIds }) => {
    const UiStore = useContext(UiStoreContext);

    return (
      <>
        <Container
          isRow
          mt={Constants.statusBarHeight + 40}
          style={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Title type="big" title="Book stash" />
          <BaseImage
            w={44}
            h={44}
            source={require("../assets/avatar.png")}
            onPress={handleClick}
          />
        </Container>
        <Container
          isRow
          mt={4}
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: 4,
          }}
        >
          <ProgressCircle
            percent={
              info?.reviewed
                ? 100
                : (UiStore.currentReviewIndex / dailyNotesIds?.length!) * 100
            }
            radius={10}
            borderWidth={4}
            color={PURPLE_COLOR}
            shadowColor="#d7d7d7"
            bgColor="#fff"
          />

          {(UiStore.currentReviewIndex / dailyNotesIds?.length!) * 100 !==
            100 && !info?.reviewed ? (
            <BaseText color="purple" ml={16} isBold>
              Review Process Pending
            </BaseText>
          ) : (
            <>
              <BaseText color="purple" ml={16} isBold>
                Today's Review
              </BaseText>
              <BaseText color="gray" fz={14} ml={16} mt={2}>
                Goal achieved
              </BaseText>
            </>
          )}
        </Container>
        <Container hasBorder mt={16} />
      </>
    );
  }
);
