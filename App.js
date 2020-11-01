import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Sheet } from "./src/sheet/Sheet";
import { NotesStoreContext } from "./src/store/NotesStore";
import { AuthStoreContext } from "./src/store/AuthStore";
import { UiStoreContext } from "./src/store/UiStore";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";
import { SearchScreen } from "./src/pages/SearchScreen";
import { LoadingScreen } from "./src/pages/LoadingScreen";
import { SettingsScreen } from "./src/pages/SettingsScreen";
import { ChooseScreen } from "./src/pages/addTag/ChooseScreen";
import { View } from "react-native";

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

export default observer(function App() {
  const NotesStore = useContext(NotesStoreContext);
  const AuthStore = useContext(AuthStoreContext);
  const UiStore = useContext(UiStoreContext);
  const settingsRef = React.useRef(null);
  const addRef = React.useRef(null);

  useEffect(() => {
    AuthStore.initFirebase();

    UiStore.setSettingsRef(settingsRef);
    UiStore.setAddRef(addRef);
  }, []);

  useEffect(() => {
    if (AuthStore.email) {
      console.log(AuthStore.email);
      NotesStore.init(AuthStore.email);
      NotesStore.fetchHighlights();
    }
  }, [AuthStore.email]);

  return (
    <>
      <Sheet
        refInit={settingsRef}
        renderContent={() => <SettingsScreen />}
      ></Sheet>

      <Sheet
        refInit={addRef}
        height={400}
        renderContent={() => <ChooseScreen />}
      ></Sheet>

      <NavigationContainer>
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
