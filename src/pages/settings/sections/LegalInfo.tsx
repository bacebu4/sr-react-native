import React from "react";
import { Container } from "../../../components/grid/Container";
import { BaseText } from "../../../components/BaseText";

export const LegalInfo: React.FC = () => {
  return (
    <>
      <Container mt={44}>
        <BaseText isBold fz={18}>
          Show terms and conditions
        </BaseText>
      </Container>

      <Container mt={24}>
        <BaseText isBold fz={18}>
          Show privacy policy
        </BaseText>
      </Container>
    </>
  );
};
