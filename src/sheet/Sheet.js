import React, { useState, useEffect, useContext } from "react";
import { View, Animated } from "react-native";
import { SettingsScreen } from "../../SettingsScreen";
import BottomSheet from "reanimated-bottom-sheet";
import { UiStoreContext } from "../store/UiStore";
import { observer } from "mobx-react-lite";

export const Sheet = observer(() => {
  const sheetRef = React.useRef(null);
  const [opacity] = useState(new Animated.Value(0));
  const [zIndex, setZIndex] = useState(-1);

  const UiStore = useContext(UiStoreContext);

  useEffect(() => {
    if (UiStore.showSettingsSheet) {
      setZIndex(2);
      handleSheet();
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
  }, [UiStore.showSettingsSheet]);

  const activateOverlay = () => {
    UiStore.setShowSettingsSheet(true);
  };

  const deactivateOverlay = () => {
    UiStore.setShowSettingsSheet(false);
  };

  const handleSheet = () => {
    sheetRef.current.snapTo(0);
  };

  const closeSheet = () => {
    sheetRef.current.snapTo(1);
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
        ref={sheetRef}
        snapPoints={[650, 0]}
        initialSnap={1}
        renderContent={() => <SettingsScreen closeSheet={closeSheet} />} // TODO pass state not func
        borderRadius={30}
        onOpenStart={activateOverlay}
        onCloseStart={deactivateOverlay}
        enabledContentTapInteraction={false}
      ></BottomSheet>
    </>
  );
});
