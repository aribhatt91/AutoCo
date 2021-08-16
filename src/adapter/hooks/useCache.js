import { useEffect } from "react";
import { useState } from "react";

export function useCache(cacheName, key) {
  const [cached, setValue] = useState(null);

  const setCache = (cacheName, key, data) => {
    try {
      let ls = window.localStorage.getItem(cacheName) || "";
      let cache = JSON.parse(ls) || {};
      cache[key] = data;
      window.localStorage.setItem(cacheName, JSON.stringify(cache));
    } catch (err) {
      //console.error('Error fetching')
    }
  };

  useEffect(() => {
    const cache = localStorage.getItem(cacheName);
    const obj = {};
    if (cache && cache.key) {
      obj.data = JSON.parse(cache.key);
    }
    setValue(obj);
  }, [cacheName, key]);

  return { cached, setCache };
}
