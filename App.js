import React, { useEffect, useContext, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Sheet } from "./src/sheet/Sheet";
import { NotesStoreContext } from "./src/store/NotesStore";
import { UiStoreContext } from "./src/store/UiStore";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";
import { SearchScreen } from "./src/pages/SearchScreen";
import { LoadingScreen } from "./src/pages/LoadingScreen";
import { ChooseScreen } from "./src/pages/addTag/ChooseScreen";
import { EditTagScreen } from "./src/pages/addTag/EditTagScreen";
import { SearchStackScreen } from "./src/stacks/SearchStackScreen";

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
  const UiStore = useContext(UiStoreContext);
  const addRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => {
    NotesStore.init();
    UiStore.setEditRef(editRef);
    UiStore.setAddRef(addRef);
  }, []);

  return (
    <>
      <Sheet
        refInit={addRef}
        height={400}
        renderContent={() => <ChooseScreen />}
      ></Sheet>

      <Sheet refInit={editRef} renderContent={() => <EditTagScreen />}></Sheet>

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
    </>
  );
});
