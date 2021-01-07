import React from "react";
import { MainContainer } from "../components/grid/MainContainer";
import { RouteProp } from "@react-navigation/native";
import { SearchStackParamList } from "src/stacks/SearchStackScreen";
import { ReviewTabScreen } from "./review/ReviewTabScreen";

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
