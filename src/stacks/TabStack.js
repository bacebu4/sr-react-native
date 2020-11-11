import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NotesStoreContext } from "../store/NotesStore";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./HomeStackScreen";
import { AuthStackScreen } from "./AuthStackScreen";
import { SearchScreen } from "../pages/SearchScreen";
import { LoadingScreen } from "../pages/LoadingScreen";

const Tab = createBottomTabNavigator();

// configuring icons here
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ _, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = "ios-home";
    } else if (route.name === "Search") {
      iconName = "ios-search";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

export const TabStack = observer(() => {
  const NotesStore = useContext(NotesStoreContext);
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: "#CCA9F9",
        inactiveTintColor: "#B0AFAF",
      }}
      navigationOptions={{
        header: null,
      }}
    >
      {NotesStore.isLoading ? (
        <Tab.Screen
          name="Add"
          component={LoadingScreen}
          options={{
            tabBarVisible: false,
          }}
        />
      ) : (
        <>
          {!NotesStore.isLogged ? (
            <Tab.Screen
              name="Add"
              component={AuthStackScreen}
              options={{
                tabBarVisible: false,
              }}
            />
          ) : (
            <>
              <Tab.Screen name="Home" component={HomeStackScreen} />
              <Tab.Screen name="Search" component={SearchScreen} />
            </>
          )}
        </>
      )}
    </Tab.Navigator>
  );
});
