import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../pages/HomeScreen";
import { ReviewScreen } from "../pages/ReviewScreen";
import { TransitionPresets } from "@react-navigation/stack";
import { ByScreen } from "../pages/ByScreen";
import { HighlightScreen } from "../pages/HighlightScreen";
import { MoreButton } from "../components/MoreButton";
import { AllBooksScreen } from "../pages/AllBooks";

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
  return (
    <>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen
          name="Review"
          component={ReviewScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <HomeStack.Screen
          name="AllBooks"
          component={AllBooksScreen}
          options={{
            title: "All books",
            headerTitle: "All books",
            headerTintColor: "#CCA9F9",
            headerTitleStyle: {
              color: "#343434",
            },
          }}
        />
        <HomeStack.Screen
          name="By"
          component={ByScreen}
          options={({ route }) => ({
            title: route.params.name,
            headerTitle: route.params.name,
            headerTintColor: "#CCA9F9",
            headerTitleStyle: {
              color: "#343434",
            },
            headerRight: () => <MoreButton route={route}></MoreButton>,
          })}
        />
        <HomeStack.Screen
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
      </HomeStack.Navigator>
    </>
  );
};
