import { useCallback } from "react";
import { Alert } from "react-native";

export const useConfirm = () => {
  return useCallback((cb, title, text) => {
    if (cb) {
      Alert.alert(title, text, [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: cb,
        },
      ]);
    }
  }, []);
};
