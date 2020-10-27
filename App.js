import React, { useState, useEffect, useContext } from "react";
import { View, Text, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./HomeScreen";
import { ReviewScreen } from "./ReviewScreen";
import { SettingsScreen } from "./SettingsScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "reanimated-bottom-sheet";
import ContextSheet from "./src/context-sheet";
import CloseContextSheet from "./src/close-context-sheet";
import { UiStoreContext } from "./src/store/UiStore";
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

const Tab = createBottomTabNavigator();

export default observer(function App() {
  const sheetRef = React.useRef(null);
  const [opacity] = useState(new Animated.Value(0));
  const [show, setShow] = useState(false);
  const [zIndex, setZIndex] = useState(-1);

  const UiStore = useContext(UiStoreContext);

  useEffect(() => {
    if (show) {
      setZIndex(1);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setZIndex(-1);
      });
    }
  }, [show]);

  const activateOverlay = () => {
    setShow(true);
    UiStore.setShowSettingsSheet(true);
  };

  const deactivateOverlay = () => {
    setShow(false);
    UiStore.setShowSettingsSheet(false);
  };

  const handleSheet = () => {
    sheetRef.current.snapTo(0);
  };

  const closeSheet = () => {
    sheetRef.current.snapTo(1);
  };

  useEffect(() => {
    if (UiStore.showSettingsSheet) {
      handleSheet();
    }
  }, [UiStore.showSettingsSheet]);

  return (
    <>
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
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Add" component={AddScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: opacity,
          zIndex: zIndex,
        }}
      ></Animated.View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[650, 0]}
        initialSnap={1}
        renderContent={() => <SettingsScreen closeSheet={closeSheet} />}
        borderRadius={30}
        onOpenStart={activateOverlay}
        onCloseStart={deactivateOverlay}
        enabledContentTapInteraction={false}
      ></BottomSheet>
    </>
  );
});
