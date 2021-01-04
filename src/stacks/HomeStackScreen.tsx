import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../pages/HomeScreen";
// @ts-ignore
import { ReviewScreen } from "../pages/ReviewScreen";
import { TransitionPresets } from "@react-navigation/stack";
// @ts-ignore
import { ByScreen } from "../pages/ByScreen";
import { HighlightScreen } from "../pages/HighlightScreen";
import { MoreButton } from "../components/MoreButton";
import { AllBooksScreen } from "../pages/AllBooks";
import { AllTagsScreen } from "../pages/AllTags";
import { useTranslation } from "react-i18next";

export type HomeStackParamList = {
  Home: undefined;
  Review: undefined;
  AllBooks: undefined;
  AllTags: undefined;
  Highlight: { name: string; noteId: string };
  Search: undefined;
  By: { id: string; type: string; name: string };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeStackScreen = () => {
  const { t } = useTranslation();

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
            title: t("All books"),
            headerTitle: t("All books"),
            headerTintColor: "#CCA9F9",
            headerTitleStyle: {
              color: "#343434",
            },
          }}
        />
        <HomeStack.Screen
          name="AllTags"
          component={AllTagsScreen}
          options={{
            title: t("All tags"),
            headerTitle: t("All tags"),
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