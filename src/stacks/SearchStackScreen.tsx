import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchScreen } from "../pages/SearchScreen";
import { HighlightScreen } from "../pages/HighlightScreen";
import { PURPLE_COLOR } from "../utils/colors";

export type SearchStackParamList = {
  Highlight: { name: string; noteId: string };
  Search: undefined;
};

const SearchStack = createStackNavigator<SearchStackParamList>();

export const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="Highlight"
        component={HighlightScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTitle: route.params.name,
          headerTintColor: PURPLE_COLOR,
          headerTitleStyle: {
            color: "#343434",
          },
        })}
      />
    </SearchStack.Navigator>
  );
};
