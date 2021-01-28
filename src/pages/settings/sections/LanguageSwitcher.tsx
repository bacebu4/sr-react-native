import React from "react";
import { Container } from "../../../components/grid/Container";
import { BaseImage } from "../../../components/BaseImage";
import { BaseText } from "../../../components/BaseText";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    const currentLanguage = i18n.language;

    switch (currentLanguage) {
      case "en":
        i18n.changeLanguage("ru");
        break;

      default:
        i18n.changeLanguage("en");
        break;
    }
  };

  return (
    <>
      <Container mt={32} isRow isCentered>
        <BaseText isBold fz={18}>
          Language
        </BaseText>
        <Container isRow isCentered hasNoMargin>
          <BaseImage
            w={24}
            h={24}
            mr={16}
            source={require("../../../assets/chevronLeft.png")}
            onPress={() => handleLanguageChange()}
          />
          <BaseText isBold isUppercase fz={18} shouldNotTranslate>
            {i18n.language}
          </BaseText>
          <BaseImage
            w={24}
            h={24}
            ml={16}
            source={require("../../../assets/chevronRight.png")}
            onPress={() => handleLanguageChange()}
          />
        </Container>
      </Container>

      <Container mt={8}>
        <BaseText color="gray">
          Configure the language you want to see in the application
        </BaseText>
      </Container>
    </>
  );
};
