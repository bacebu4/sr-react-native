import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Sheet } from "./src/sheet/Sheet";
import { NotesStoreContext } from "./src/store/NotesStore";
import { AuthStoreContext } from "./src/store/AuthStore";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";
import { SearchScreen } from "./src/pages/SearchScreen";
import { LoadingScreen } from "./src/pages/LoadingScreen";

const Tab = createBottomTabNavigator();

export default observer(function App() {
  const NotesStore = useContext(NotesStoreContext);
  const AuthStore = useContext(AuthStoreContext);

  useEffect(() => {
    NotesStore.fetchHighlights();
    AuthStore.initFirebase();
  }, []);

  return (
    <>
      <Sheet></Sheet>

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "ios-home";
              } else if (route.name === "Search") {
                iconName = "ios-search";
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
          {AuthStore.isLoading ? (
            <Tab.Screen
              name="Add"
              component={LoadingScreen}
              options={{
                tabBarVisible: false,
              }}
            />
          ) : (
            <>
              {!AuthStore.isLogged ? (
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
      </NavigationContainer>
    </>
  );
});
