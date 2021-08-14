import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useCache } from "./useCache";

const useOptimisedFetch = ({
  cacheName,
  key,
  url,
  method = "get",
  body = null,
  headers = null
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const cache = useCache(cacheName, key);

  const fetchData = () => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    if (cache && cache.data) {
      if (cache.data) {
        setResponse(cache.data);
        setloading(false);
      } else {
        fetchData();
      }
    }
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useOptimisedFetch;
