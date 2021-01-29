import React, { useContext } from "react";
import { ActivityIndicator, Text } from "react-native";
import { Container } from "../../../components/grid/Container";
import { Title } from "../../../components/Title";
import { useTranslation } from "react-i18next";
import { GRAY_COLOR, PURPLE_COLOR } from "../../../utils/colors";
import { BaseText } from "../../../components/BaseText";
import { useInfoQuery } from "../../../generated/graphql";
import ProgressCircle from "react-native-progress-circle";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../../utils/UiStore";
import { MainButton } from "../../../components/MainButton";
import { useNavigation } from "@react-navigation/native";

export const ReviewingGoals: React.FC = observer(() => {
  const [result] = useInfoQuery();
  const { data, error, fetching } = result;
  const { t } = useTranslation();
  const UiStore = useContext(UiStoreContext);
  const navigation = useNavigation();

  if (error) {
    return (
      <Container isCentered mt={400}>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (fetching) {
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
        <BaseText
          color="gray"
          mt={16}
          style={{ textAlign: "center", maxWidth: 300 }}
        >
          Don’t forget what you read. Review your notes daily!
        </BaseText>
      </Container>

      <Container mt={32} isCentered>
        <ProgressCircle
          percent={
            data?.info?.reviewed
              ? 100
              : (UiStore.currentReviewIndex / data?.info?.reviewAmount!) * 100
          }
          radius={120}
          borderWidth={32}
          color={PURPLE_COLOR}
          shadowColor="#d7d7d7"
          bgColor="#fff"
        >
          <BaseText isSerif isBold fz={40} shouldNotTranslate>
            {UiStore.currentReviewIndex} / {data?.info?.reviewAmount!}
          </BaseText>
        </ProgressCircle>
      </Container>

      <Container isCentered mt={32}>
        <BaseText
          isSerif
          fz={24}
          style={{ textAlign: "center", maxWidth: 300 }}
        >
          You have 0 days in a row...
        </BaseText>
      </Container>

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
