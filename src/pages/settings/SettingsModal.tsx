import React, { useContext } from "react";
import { GestureResponderEvent, Modal } from "react-native";
import { MainContainer } from "../../components/grid/MainContainer";
import { Container } from "../../components/grid/Container";
import { NavbarTopSecondary } from "../../components/NavbarTopSecondary";
import { MainButton } from "../../components/MainButton";
import { useTranslation } from "react-i18next";
import { UiStoreContext } from "../../utils/UiStore";
import { observer } from "mobx-react-lite";
import { BaseText } from "../../components/BaseText";
import { useInfoQuery } from "../../generated/graphql";
import { BaseInfo } from "./sections/BaseInfo";
import { ReviewAmountStepper } from "./sections/ReviewAmountStepper";
import { LanguageSwitcher } from "./sections/LanguageSwitcher";

interface Props {
  modalState: boolean;
  setModalState: (arg0: boolean) => void;
  handleDone: (event: GestureResponderEvent) => void;
}

export const SettingsModal: React.FC<Props> = observer(
  ({ modalState, setModalState, handleDone }) => {
    const UiStore = useContext(UiStoreContext);
    const { t } = useTranslation();
    const [result] = useInfoQuery();
    const { data } = result;

    const handleLogout = () => {
      UiStore.logout();
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

          <LanguageSwitcher />

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
