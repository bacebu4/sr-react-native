import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./HomeScreen";
import { AuthHomeScreen } from "./src/pages/auth/AuthHomeScreen";
import { AuthLoginScreen } from "./src/pages/auth/AuthLoginScreen";
import { ReviewScreen } from "./ReviewScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Sheet } from "./src/sheet/Sheet";
import { NotesStoreContext } from "./src/store/NotesStore";
import { AuthStoreContext } from "./src/store/AuthStore";
import { observer } from "mobx-react-lite";

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
const AuthStack = createStackNavigator();

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

function AuthStackScreen() {
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
}

const Tab = createBottomTabNavigator();

export default observer(function App() {
  const NotesStore = useContext(NotesStoreContext);
  const AuthStore = useContext(AuthStoreContext);

  useEffect(() => {
    NotesStore.fetchHighlights();
    // AuthStore.initFirebase();
    console.log(AuthStore.isLogged);
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
