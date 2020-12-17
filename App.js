import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NotesStoreContext } from "./src/store/NotesStore";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";
import { LoadingScreen } from "./src/pages/LoadingScreen";
import { SearchStackScreen } from "./src/stacks/SearchStackScreen";
import { createClient, Provider } from "urql";
import * as SecureStore from "expo-secure-store";
import { BACK_URL } from "@env";

let TOKEN;

const getToken = async () => {
  try {
    const available = await SecureStore.isAvailableAsync();
    if (!available) {
      throw new Error();
    }
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error();
    }
    console.log(token);
    return token;
  } catch (error) {
    return "";
  }
};

const client = createClient({
  url: `${BACK_URL}/graphql`,
  fetchOptions: () => {
    return {
      headers: { authorization: TOKEN },
    };
  },
});

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

  useEffect(() => {
    async function fetchToken() {
      TOKEN = await getToken();
    }
    fetchToken();
    NotesStore.init();
  }, []);

  return (
    <Provider value={client}>
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
                  <Tab.Screen name="Search" component={SearchStackScreen} />
                </>
              )}
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
});
