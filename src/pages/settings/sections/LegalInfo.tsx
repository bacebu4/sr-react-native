import React, { useState } from "react";
import { Container } from "../../../components/grid/Container";
import { BaseText } from "../../../components/BaseText";
import { PopUpModal } from "../../../components/PopUpModal";
import { termsAndConditions } from "./termsAndConditions";

export const LegalInfo: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <Container mt={44}>
        <BaseText isBold fz={18} onPress={() => setShowTerms(true)}>
          Show terms and conditions
        </BaseText>
      </Container>

      <PopUpModal
        visible={showTerms}
        onRequestClose={() => setShowTerms(false)}
      >
        {termsAndConditions}
      </PopUpModal>

      <Container mt={24}>
        <BaseText isBold fz={18}>
          Show privacy policy
        </BaseText>
      </Container>
    </>
  );
};
