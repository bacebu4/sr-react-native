import { useState, useCallback } from "react";

export const useRequest = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "http://192.168.1.70:3000";

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

        const response = await fetch(baseUrl + url, {
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
