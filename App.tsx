import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";
import { LoadingScreen } from "./src/pages/LoadingScreen";
import { SearchStackScreen } from "./src/stacks/SearchStackScreen";
import { Provider } from "urql";
import i18n from "./src/utils/i18n";
import { useTranslation } from "react-i18next";
import { UiStoreContext } from "./src/utils/UiStore";
import { iconsConfig } from "./src/utils/iconsConfig";
import { createUrqlClient } from "./src/utils/createUrqlClient";
import { GRAY_COLOR, PURPLE_COLOR } from "./src/utils/colors";

// @ts-ignore
const initI18n = i18n;

const Tab = createBottomTabNavigator();

export default observer(function App() {
  const UiStore = useContext(UiStoreContext);
  const { t } = useTranslation();
  let client = createUrqlClient(UiStore.token ?? "");

  async function initAsync() {
    await UiStore.init();
    client = createUrqlClient(UiStore.token ?? "");
  }

  useEffect(() => {
    initAsync();
  }, [UiStore.isLogged, UiStore.token]);

  return (
    <Provider value={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={iconsConfig}
          tabBarOptions={{
            activeTintColor: PURPLE_COLOR,
            inactiveTintColor: GRAY_COLOR,
            activeBackgroundColor: "#ffffff",
            inactiveBackgroundColor: "#ffffff",
          }}
        >
          {UiStore.isLoading ? (
            <Tab.Screen
              name="Add"
              component={LoadingScreen}
              options={{
                tabBarVisible: false,
              }}
            />
          ) : (
            <>
              {!UiStore.isLogged ? (
                <Tab.Screen
                  name="Add"
                  component={AuthStackScreen}
                  options={{
                    tabBarVisible: false,
                  }}
                />
              ) : (
                <>
                  <Tab.Screen name={t("Home")} component={HomeStackScreen} />
                  <Tab.Screen
                    name={t("Search")}
                    component={SearchStackScreen}
                  />
                </>
              )}
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
});
