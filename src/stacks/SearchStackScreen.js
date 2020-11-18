import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchScreen } from "../pages/SearchScreen";
import { HighlightScreen } from "../pages/HighlightScreen";

const SearchStack = createStackNavigator();

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
          headerTintColor: "#CCA9F9",
          headerTitleStyle: {
            color: "#343434",
          },
        })}
      />
    </SearchStack.Navigator>
  );
};
