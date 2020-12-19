import { useCallback } from "react";
import { Alert } from "react-native";

export const useMessage = () => {
  return useCallback((text: string) => {
    if (text) {
      Alert.alert("Error occurred", text);
    }
  }, []);
};
