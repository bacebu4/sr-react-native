import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../pages/HomeScreen";
import { ReviewScreen } from "../pages/ReviewScreen";
import { TransitionPresets } from "@react-navigation/stack";
import { ByBookScreen } from "../pages/ByBookScreen";

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
          name="ByBook"
          component={ByBookScreen}
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
