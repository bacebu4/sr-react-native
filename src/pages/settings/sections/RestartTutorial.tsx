import React from "react";
import { Container } from "../../../components/grid/Container";
import { BaseText } from "../../../components/BaseText";

export const RestartTutorial: React.FC = () => {
  return (
    <>
      <Container mt={32}>
        <BaseText isBold fz={18}>
          Restart tutorial
        </BaseText>
      </Container>

      <Container mt={8}>
        <BaseText color="gray">
          Click this button if you want to see the tutorial all over again in
          case you miss something
        </BaseText>
      </Container>
    </>
  );
};
