import { useState, useCallback } from "react";
import { URL } from "@env";

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

        const response = await fetch(URL + url, {
          method,
          headers,
          body,
        });

        return await response.json();
      } catch (error) {
        setError(e.message);
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
