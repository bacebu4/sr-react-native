import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthHomeScreen } from "../pages/auth/AuthHomeScreen";
// @ts-ignore
import { AuthLoginScreen } from "../pages/auth/AuthLoginScreen";
// @ts-ignore
import { AuthEmailScreen } from "../pages/auth/AuthEmailScreen";
// @ts-ignore
import { AuthPasswordScreen } from "../pages/auth/AuthPasswordScreen";

export type AuthStackParamList = {
  AuthHome: undefined;
  AuthLogin: undefined;
  AuthEmail: undefined;
  AuthPassword: { email: string };
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthStackScreen = () => {
  return (
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
      <AuthStack.Screen
        name="AuthEmail"
        component={AuthEmailScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="AuthPassword"
        component={AuthPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};
