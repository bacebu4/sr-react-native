import React, { useContext, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";
import { SearchStackScreen } from "./src/stacks/SearchStackScreen";
import { Provider } from "urql";
import i18n from "./src/utils/i18n";
import { useTranslation } from "react-i18next";
import { iconsConfig } from "./src/utils/iconsConfig";
import { GRAY_COLOR, PURPLE_COLOR } from "./src/utils/colors";
import { createClient, dedupExchange, fetchExchange } from "urql";
import { authExchange } from "@urql/exchange-auth";

import { BACKEND_URL } from "./src/variables";
import { cacheExchange } from "@urql/exchange-graphcache";
import { authExchangeConfig } from "./src/exchanges/authExchangeConfig";
import { cacheExchangeConfig } from "./src/exchanges/cacheExchangeConfig";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "./src/utils/UiStore";

// @ts-ignore
const initI18n = i18n;

const Tab = createBottomTabNavigator();

export default observer(function App() {
  const { t } = useTranslation();
  const UiStore = useContext(UiStoreContext);

  console.log("TICK");

  useEffect(() => {
    console.log("changed ", UiStore.isLogged);
  }, [UiStore.isLogged]);

  const client = useMemo(() => {
    console.log("UiStore.isLogged: ", UiStore.isLogged);

    if (UiStore.isLogged === null) {
      return null;
    }

    return createClient({
      url: `${BACKEND_URL}/graphql`,
      exchanges: [
        dedupExchange,
        cacheExchange(cacheExchangeConfig) as any,
        authExchange(authExchangeConfig(UiStore.setLogged)) as any,
        fetchExchange,
      ],
    });
  }, [UiStore.isLogged, UiStore.setLogged]);

  if (!client) {
    return null;
  }

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
              <Tab.Screen name={t("Search")} component={SearchStackScreen} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
});
