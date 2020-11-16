import React from "react";
import { MainContainer } from "../components/grid/MainContainer";
import { ReviewTabScreen } from "./review/ReviewTabScreen";

export const HighlightScreen = ({ route }) => {
  return (
    <MainContainer>
      <ReviewTabScreen noteId={route.params.note_id}></ReviewTabScreen>
    </MainContainer>
  );
};
