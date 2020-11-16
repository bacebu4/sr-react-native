import { useCallback } from "react";
import { Alert } from "react-native";

export const useMessage = () => {
  return useCallback((text) => {
    if (text) {
      Alert.alert("Error occurred", text);
    }
  }, []);
};
