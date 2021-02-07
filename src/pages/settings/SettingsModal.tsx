import React, { useContext } from "react";
import { GestureResponderEvent, Modal } from "react-native";
import { MainContainer } from "../../components/grid/MainContainer";
import { Container } from "../../components/grid/Container";
import { NavbarTopSecondary } from "../../components/NavbarTopSecondary";
import { MainButton } from "../../components/MainButton";
import { useTranslation } from "react-i18next";
import { UiStoreContext } from "../../utils/UiStore";
import { observer } from "mobx-react-lite";
import { useInfoQuery } from "../../generated/graphql";
import { BaseInfo } from "./sections/BaseInfo";
import { ReviewAmountStepper } from "./sections/ReviewAmountStepper";
import { LanguageSwitcher } from "./sections/LanguageSwitcher";
import { LegalInfo } from "./sections/LegalInfo";
import { RestartTutorial } from "./sections/RestartTutorial";
import { ScrollView } from "react-native-gesture-handler";

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
          <ScrollView>
            <NavbarTopSecondary
              title={t("Account preferences")}
              handleNext={handleDone}
              titleRight={t("Done")}
              hasNoMargin
            />

            <BaseInfo email={data?.info?.email} />

            <ReviewAmountStepper reviewAmount={data?.info?.reviewAmount} />

            <LanguageSwitcher />

            <RestartTutorial />

            <LegalInfo />

            <Container mt={64} mb={64} isCentered>
              <MainButton onPress={handleLogout} title="Sign Out" />
            </Container>
          </ScrollView>
        </MainContainer>
      </Modal>
    );
  }
);
