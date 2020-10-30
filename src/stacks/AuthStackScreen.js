import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthHomeScreen } from "../pages/auth/AuthHomeScreen";
import { AuthLoginScreen } from "../pages/auth/AuthLoginScreen";

const AuthStack = createStackNavigator();

export const AuthStackScreen = () => {
  return (
    <>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="AuthHome"
          component={AuthHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="AuthLogin"
          component={AuthLoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    </>
  );
};
