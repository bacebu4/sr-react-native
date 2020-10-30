import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../pages/HomeScreen";
import { ReviewScreen } from "../pages/ReviewScreen";

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
          }}
        />
      </HomeStack.Navigator>
    </>
  );
};
