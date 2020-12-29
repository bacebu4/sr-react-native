import React from "react";
import { MainContainer } from "../components/grid/MainContainer";
// @ts-ignore
import { ReviewTabScreen } from "./review/ReviewTabScreen";
import { RouteProp } from "@react-navigation/native";
import { SearchStackParamList } from "src/stacks/SearchStackScreen";

type HighlightScreenRouteProp = RouteProp<SearchStackParamList, "Highlight">;

type Props = {
  route: HighlightScreenRouteProp;
};

export const HighlightScreen: React.FC<Props> = ({ route }) => {
  return (
    <MainContainer>
      <ReviewTabScreen noteId={route.params.noteId}></ReviewTabScreen>
    </MainContainer>
  );
};
