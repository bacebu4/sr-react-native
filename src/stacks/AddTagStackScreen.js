import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ChooseScreen } from "../pages/addTag/ChooseScreen";
import { View } from "react-native";
import { AddScreen } from "../pages/addTag/AddScreen";

const AddTagStack = createStackNavigator();

export const AddTagStackScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: 400,
      }}
    >
      <NavigationContainer>
        <AddTagStack.Navigator>
          <AddTagStack.Screen
            name="ChooseScreen"
            component={ChooseScreen}
            options={{
              headerShown: false,
            }}
          />
          {/* <AddTagStack.Screen
            name="AddScreen"
            component={AddScreen}
            options={{
              headerShown: false,
            }}
          /> */}
        </AddTagStack.Navigator>
      </NavigationContainer>
    </View>
  );
};
