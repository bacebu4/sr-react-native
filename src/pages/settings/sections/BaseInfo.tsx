import { Container } from "../../../components/grid/Container";
import { BaseImage } from "../../../components/BaseImage";
import { BaseText } from "../../../components/BaseText";
import React from "react";

interface Props {
  email: string | undefined;
}

export const BaseInfo: React.FC<Props> = ({ email }) => {
  return (
    <Container
      mt={32}
      isRow
      isCentered
      style={{ justifyContent: "flex-start" }}
    >
      <BaseImage w={44} h={44} source={require("../../../assets/avatar.png")} />
      <Container>
        <BaseText isBold fz={18} shouldNotTranslate>
          Vasilii Krasikov
        </BaseText>
        <BaseText color="gray" shouldNotTranslate>
          {email}
        </BaseText>
      </Container>
    </Container>
  );
};
