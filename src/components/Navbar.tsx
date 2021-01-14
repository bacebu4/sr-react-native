import React, { useContext } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Constants from "expo-constants";
import { Title } from "./Title";
import { observer } from "mobx-react-lite";
import { TextGray } from "./TextGray";
import { TText } from "./TText";
import { Container } from "./grid/Container";
import { UiStoreContext } from "../store/UiStore";
import { useInfoQuery } from "../generated/graphql";

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
        <TouchableOpacity onPress={handleClick}>
          <Image style={styles.icon} source={require("../assets/avatar.png")} />
        </TouchableOpacity>
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
          color="#CCA9F9"
          shadowColor="#d7d7d7"
          bgColor="#fff"
        />

        {!data?.info?.reviewed ? (
          <TText style={styles.info}>Review Process Pending</TText>
        ) : (
          <>
            <TText style={styles.info}>Today's Review</TText>
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

const styles = StyleSheet.create({
  icon: {
    width: 44,
    height: 44,
  },
  info: {
    marginLeft: 16,
    fontWeight: "600",
    color: "#CCA9F9",
  },
});
