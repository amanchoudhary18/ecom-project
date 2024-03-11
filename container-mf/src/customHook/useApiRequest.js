import { useState } from "react";
import axios from "axios";
import isUserLoggedIn from "../utils/isUserLoggedIn";

export const useApiRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = (url, method, requiresToken = false, body = null) => {
    return new Promise(async (resolve, reject) => {
      const userToken = requiresToken ? isUserLoggedIn() : null;
      const config = userToken
        ? { headers: { Authorization: `Bearer ${userToken}` } }
        : {};

      try {
        const response = await axios({ method, url, data: body, ...config });
        setData(response.data);
        resolve(response.data);
      } catch (err) {
        setError(err);
        reject(err);
      }
    });
  };

  return { data, error, sendRequest };
};
