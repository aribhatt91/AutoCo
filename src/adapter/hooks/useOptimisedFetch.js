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
  headers = null,
  fromCache = true
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const { cached, setCache } = useCache(cacheName, key);

  const fetchData = async () => {
    try {
      const res = await axios[method](
        url,
        JSON.parse(headers),
        JSON.parse(body)
      );
      const data = res.data;
      setResponse(data);
      setCache(cacheName, key, data);
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (!fromCache) {
      fetchData();
    } else {
      if (cached) {
        if (cached.data) {
          setResponse(cached.data);
          setloading(false);
        } else {
          fetchData();
        }
      }
    }
  }, [method, url, body, headers, cached, fromCache]);

  return { response, error, loading };
};

export default useOptimisedFetch;
