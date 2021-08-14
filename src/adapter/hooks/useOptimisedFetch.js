import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useCache } from "./useCache";

const setLocalStorage = (cacheName, key, data) => {
  try {
    let ls = window.localStorage.getItem(cacheName) || {};
    let cache = JSON.parse(ls);
    cache[key] = data;
    window.localStorage.setItem(cacheName, JSON.stringify(cache));
  } catch (err) {
    //console.error('Error fetching')
  }
};
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
  const cache = useCache(cacheName, key);

  const fetchData = async () => {
    try {
      const res = await axios[method](
        url,
        JSON.parse(headers),
        JSON.parse(body)
      );
      const data = res.data;
      setResponse(data);
      setLocalStorage(cacheName, key, data);
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
      if (cache) {
        if (cache.data) {
          setResponse(cache.data);
          setloading(false);
        } else {
          fetchData();
        }
      }
    }

    //fetchData();
  }, [method, url, body, headers, cache]);

  return { response, error, loading };
};

export default useOptimisedFetch;
