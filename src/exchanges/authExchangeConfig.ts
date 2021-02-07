import * as SecureStore from "expo-secure-store";
import { makeOperation } from "@urql/core";
import { AuthConfig } from "@urql/exchange-auth/dist/types/authExchange";

const addAuthToOperation: any = ({ authState, operation }: any) => {
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
};

async function logout() {
  await SecureStore.deleteItemAsync("token");
}

export const authExchangeConfig = (
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>
) => {
  return {
    async getAuth({ authState }: any) {
      console.log("authState getAuth", authState);

      if (!authState) {
        const token = await SecureStore.getItemAsync("token");
        console.log("token getAuth", token);
        if (token) {
          console.log("before return");
          setIsLoggedIn(true);
          return { token };
        }
        return null;
      }

      await logout();
      setIsLoggedIn(false);

      return null;
    },
    addAuthToOperation,
  };
};

// export const authExchange = {
//   getAuth,
//   addAuthToOperation,
// };
