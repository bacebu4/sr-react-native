import React, { useState } from "react";
import { Animated } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../store/UiStore";

export const Sheet = observer(({ refInit, height = 650, renderContent }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [zIndex, setZIndex] = useState(-1);
  const UiStore = React.useContext(UiStoreContext);

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
    if (height === 400) {
      refInit.current.snapTo(1);
    } else {
      refInit.current.snapTo(0);
    }
  };

  const closeSheet = () => {
    if (height === 400) {
      refInit.current.snapTo(2);
    } else {
      refInit.current.snapTo(1);
    }
  };

  const destroySheet = () => {
    // showAddSheet
    UiStore.setShowAddSheet(false);
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
      {height === 400 ? (
        <BottomSheet
          ref={refInit}
          snapPoints={[650, height, 0]}
          initialSnap={2}
          renderContent={renderContent}
          borderRadius={30}
          onOpenStart={activateOverlay}
          onCloseStart={deactivateOverlay}
          onCloseEnd={destroySheet}
          enabledContentTapInteraction={false}
        ></BottomSheet>
      ) : (
        <BottomSheet
          ref={refInit}
          snapPoints={[height, 0]}
          initialSnap={1}
          renderContent={renderContent}
          borderRadius={30}
          onOpenStart={activateOverlay}
          onCloseStart={deactivateOverlay}
          enabledContentTapInteraction={false}
        ></BottomSheet>
      )}
    </>
  );
});
