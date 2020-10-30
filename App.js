import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Sheet } from "./src/sheet/Sheet";
import { NotesStoreContext } from "./src/store/NotesStore";
import { AuthStoreContext } from "./src/store/AuthStore";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";

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
              {/* <Tab.Screen name="Add" component={AddScreen} /> */}
              <Tab.Screen name="Search" component={SearchScreen} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
});
