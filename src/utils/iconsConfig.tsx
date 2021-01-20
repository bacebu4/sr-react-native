import React from "react";
import { Route } from "@react-navigation/native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
// @ts-ignore
import Ionicons from "@expo/vector-icons/Ionicons";

export const iconsConfig: (props: {
  route: Route<string, object | undefined>;
  navigation: any;
}) => BottomTabNavigationOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    const { t } = useTranslation();

    if (route.name === t("Home")) {
      iconName = "ios-home";
    } else if (route.name === t("Search")) {
      iconName = "ios-search";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});
