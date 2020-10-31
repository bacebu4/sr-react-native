import React, { useState } from "react";
import { Animated } from "react-native";
import { SettingsScreen } from "../pages/SettingsScreen";
import BottomSheet from "reanimated-bottom-sheet";
import { observer } from "mobx-react-lite";

export const Sheet = observer(({ refInit }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [zIndex, setZIndex] = useState(-1);

  const activateOverlay = () => {
    setZIndex(2);
    handleSheet();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const deactivateOverlay = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setZIndex(-1);
    });
    closeSheet();
  };

  const handleSheet = () => {
    refInit.current.snapTo(0);
  };

  const closeSheet = () => {
    refInit.current.snapTo(1);
  };

  return (
    <>
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
        ref={refInit}
        snapPoints={[650, 0]}
        initialSnap={1}
        renderContent={() => <SettingsScreen />}
        borderRadius={30}
        onOpenStart={activateOverlay}
        onCloseStart={deactivateOverlay}
        enabledContentTapInteraction={false}
      ></BottomSheet>
    </>
  );
});
