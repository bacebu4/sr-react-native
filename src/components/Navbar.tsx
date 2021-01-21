import React, { useContext } from "react";
import { GestureResponderEvent, ActivityIndicator } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Constants from "expo-constants";
import { Title } from "./Title";
import { observer } from "mobx-react-lite";
import { TextGray } from "./TextGray";
import { TText } from "./TText";
import { Container } from "./grid/Container";
import { UiStoreContext } from "../utils/UiStore";
import { useInfoQuery } from "../generated/graphql";
import { BaseImage } from "./BaseImage";
import { PURPLE_COLOR } from "../utils/colors";
import { BaseText } from "./BaseText";

interface Props {
  title: string;
  handleClick: ((event: GestureResponderEvent) => void) | undefined;
}

export const Navbar: React.FC<Props> = observer(({ title, handleClick }) => {
  const UiStore = useContext(UiStoreContext);
  const [result] = useInfoQuery();
  const { data, fetching, error } = result;

  if (error) {
    return (
      <Container isCentered>
        <TText>{error.message}</TText>
      </Container>
    );
  }

  if (fetching) {
    return (
      <Container isCentered>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <>
      <Container
        isRow
        mt={Constants.statusBarHeight + 40}
        style={{ justifyContent: "space-between", alignItems: "baseline" }}
      >
        <Title type="big" title={title} />
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
            data?.info?.reviewed
              ? 100
              : (UiStore.currentReviewIndex / data?.info?.reviewAmount!) * 100
          }
          radius={10}
          borderWidth={4}
          color={PURPLE_COLOR}
          shadowColor="#d7d7d7"
          bgColor="#fff"
        />

        {(UiStore.currentReviewIndex / data?.info?.reviewAmount!) * 100 !==
          100 && !data?.info?.reviewed ? (
          <BaseText color="purple" ml={16} isBold>
            Review Process Pending
          </BaseText>
        ) : (
          <>
            <BaseText color="purple" ml={16} isBold>
              Today's Review
            </BaseText>
            <TextGray ml={8}>
              <TText>Goal achieved</TText>
            </TextGray>
          </>
        )}
      </Container>
      <Container hasBorder mt={16} />
    </>
  );
});
