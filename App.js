import React, { useState } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./HomeScreen";
import { ReviewScreen } from "./ReviewScreen";
import { SettingsScreen } from "./SettingsScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "reanimated-bottom-sheet";
import ContextSheet from "./src/context-sheet";

function AddScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Add!</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search!</Text>
    </View>
  );
}

const HomeStack = createStackNavigator();

const Overlay = ({ show }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: show ? 1 : 0,
        zIndex: show ? 1 : -1,
        trans,
      }}
    ></View>
  );
};

function HomeStackScreen() {
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
}

const Tab = createBottomTabNavigator();

export default function App() {
  const sheetRef = React.useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const activateOverlay = () => {
    setShowOverlay(true);
  };

  const deactivateOverlay = () => {
    setShowOverlay(false);
  };

  const handleSheet = () => {
    sheetRef.current.snapTo(0);
  };

  return (
    <ContextSheet.Provider value={{ handleSheet }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "ios-home";
              } else if (route.name === "Search") {
                iconName = "ios-search";
              } else if (route.name === "Add") {
                iconName = focused
                  ? "ios-add-circle"
                  : "ios-add-circle-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#CCA9F9",
            inactiveTintColor: "#B0AFAF",
          }}
          navigationOptions={{
            header: null,
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Add" component={AddScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Overlay show={showOverlay}></Overlay>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[650, 0]}
        initialSnap={1}
        borderRadius={30}
        renderContent={SettingsScreen}
        onOpenStart={activateOverlay}
        onCloseStart={deactivateOverlay}
      />
    </ContextSheet.Provider>
  );
}
