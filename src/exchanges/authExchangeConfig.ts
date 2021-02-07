import * as SecureStore from "expo-secure-store";
import { makeOperation } from "@urql/core";
import { TOKEN_STORAGE_NAME } from "../variables";

export const authExchangeConfig = (setLogged: (value: boolean) => void) => {
  return {
    async getAuth({ authState }: any) {
      if (!authState) {
        const token = await SecureStore.getItemAsync(TOKEN_STORAGE_NAME);
        console.log(token);

        if (token) {
          console.log("before");

          setLogged(true);
          return { token };
        }
        return null;
      }

      await SecureStore.deleteItemAsync(TOKEN_STORAGE_NAME);
      setLogged(false);

      return null;
    },

    addAuthToOperation({ authState, operation }: any) {
      if (!authState || !authState.token) {
        return operation;
      }

      const fetchOptions =
        typeof operation.context.fetchOptions === "function"
          ? operation.context.fetchOptions()
          : operation.context.fetchOptions || {};

      return makeOperation(operation.kind, operation, {
        ...operation.context,
        fetchOptions: {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            authorization: authState.token,
          },
        },
      });
    },
  };
};
