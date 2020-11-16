import React from "react";
import { MainContainer } from "../components/grid/MainContainer";
import { ReviewTabScreen } from "./review/ReviewTabScreen";

export const HighlightScreen = () => {
  return (
    <MainContainer>
      <ReviewTabScreen></ReviewTabScreen>
    </MainContainer>
  );
};
