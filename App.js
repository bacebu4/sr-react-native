import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Sheet } from "./src/sheet/Sheet";
import { NotesStoreContext } from "./src/store/NotesStore";
import { UiStoreContext } from "./src/store/UiStore";
import { observer } from "mobx-react-lite";
import { SettingsScreen } from "./src/pages/SettingsScreen";
import { ChooseScreen } from "./src/pages/addTag/ChooseScreen";
import { EditTagScreen } from "./src/pages/addTag/EditTagScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { TabStack } from "./src/stacks/TabStack";
import { Button, View } from "react-native";
import { Text } from "react-native";
import { TransitionPresets } from "@react-navigation/stack";

const RootStack = createStackNavigator();

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default observer(function App() {
  const NotesStore = useContext(NotesStoreContext);
  const UiStore = useContext(UiStoreContext);
  const settingsRef = React.useRef(null);
  const addRef = React.useRef(null);
  const editRef = React.useRef(null);

  useEffect(() => {
    NotesStore.init();
    UiStore.setSettingsRef(settingsRef);
    UiStore.setEditRef(editRef);
    UiStore.setAddRef(addRef);
  }, []);

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

      <Sheet refInit={editRef} renderContent={() => <EditTagScreen />}></Sheet>

      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={TabStack}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="MyModal"
            component={ModalScreen}
            options={{
              ...TransitionPresets.ModalPresentationIOS,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
});
