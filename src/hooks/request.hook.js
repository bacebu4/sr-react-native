import { useState, useCallback } from "react";
import { BACKEND_URL } from "../variables";

export const useRequest = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", token, data = null) => {
      setLoading(true);
      try {
        const headers = {};
        if (token) {
          headers["auth-token"] = token;
        }
        let body = null;

        if (data) {
          headers["Content-Type"] = "application/json";
          body = JSON.stringify(data);
        }
        console.log(BACKEND_URL + url, "fetching");
        const response = await fetch(BACKEND_URL + url, {
          method,
          headers,
          body,
        });

        return await response.json();
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
