import React, { useContext } from "react";
import { GestureResponderEvent, Modal } from "react-native";
import { MainContainer } from "../../components/grid/MainContainer";
import { Container } from "../../components/grid/Container";
import { NavbarTopSecondary } from "../../components/NavbarTopSecondary";
import { MainButton } from "../../components/MainButton";
import { useTranslation } from "react-i18next";
import { UiStoreContext } from "../../utils/UiStore";
import { BaseImage } from "../../components/BaseImage";
import { observer } from "mobx-react-lite";
import { BaseText } from "../../components/BaseText";
import { useInfoQuery } from "../../generated/graphql";
import { BaseInfo } from "./sections/BaseInfo";
import { ReviewAmountStepper } from "./sections/ReviewAmountStepper";

interface Props {
  modalState: boolean;
  setModalState: (arg0: boolean) => void;
  handleDone: (event: GestureResponderEvent) => void;
}

export const SettingsModal: React.FC<Props> = observer(
  ({ modalState, setModalState, handleDone }) => {
    const UiStore = useContext(UiStoreContext);
    const { t, i18n } = useTranslation();
    const [result] = useInfoQuery();
    const { data } = result;

    const handleLogout = () => {
      UiStore.logout();
    };

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
      <Modal
        animationType="slide"
        visible={modalState}
        onRequestClose={() => {
          setModalState(false);
        }}
        onDismiss={() => setModalState(false)}
        presentationStyle="formSheet"
      >
        <MainContainer>
          <NavbarTopSecondary
            title={t("Account preferences")}
            handleNext={handleDone}
            titleRight={t("Done")}
            hasNoMargin
          />

          <BaseInfo email={data?.info?.email} />

          <ReviewAmountStepper reviewAmount={data?.info?.reviewAmount} />

          <Container mt={32} isRow isCentered>
            <BaseText isBold fz={18}>
              Language
            </BaseText>
            <Container isRow isCentered hasNoMargin>
              <BaseImage
                w={24}
                h={24}
                mr={16}
                source={require("../../assets/chevronLeft.png")}
                onPress={handleLanguageChange}
              />
              <BaseText isBold isUppercase fz={18} shouldNotTranslate>
                {i18n.language}
              </BaseText>
              <BaseImage
                w={24}
                h={24}
                ml={16}
                source={require("../../assets/chevronRight.png")}
                onPress={handleLanguageChange}
              />
            </Container>
          </Container>

          <Container mt={8}>
            <BaseText color="gray">
              Configure the language you want to see in the application
            </BaseText>
          </Container>

          <Container mt={32}>
            <BaseText isBold fz={18}>
              Restart tutorial
            </BaseText>
          </Container>

          <Container mt={8}>
            <BaseText color="gray">
              Click this button if you want to see the tutorial all over again
              in case you miss something
            </BaseText>
          </Container>

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

          <Container mt={64} isCentered>
            <MainButton onPress={handleLogout} title="Sign Out" />
          </Container>
        </MainContainer>
      </Modal>
    );
  }
);
