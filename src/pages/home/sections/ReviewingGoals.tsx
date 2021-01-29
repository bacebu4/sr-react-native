import React from "react";
// import { ActivityIndicator, View } from "react-native";
import { Container } from "../../../components/grid/Container";
import { Title } from "../../../components/Title";
import { useTranslation } from "react-i18next";
import { GRAY_COLOR } from "../../../utils/colors";
import { BaseText } from "../../../components/BaseText";

export const ReviewingGoals: React.FC = () => {
  const { t } = useTranslation();
  // if (error) {
  //   return (
  //     <Container isCentered mt={400}>
  //       <Text>{error.message}</Text>
  //     </Container>
  //   );
  // }

  // if (fetching) {
  //   return (
  //     <Container isCentered mt={400}>
  //       <ActivityIndicator size="large" />
  //     </Container>
  //   );
  // }

  return (
    <>
      <Container
        mt={24}
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
      <Container isCentered pb={64}>
        <Title title={t("Reviewing Goals")} />
        <BaseText
          color="gray"
          mt={16}
          style={{ textAlign: "center", maxWidth: 300 }}
        >
          Don’t forget what you read. Review your notes daily!
        </BaseText>
      </Container>
    </>
  );
};
