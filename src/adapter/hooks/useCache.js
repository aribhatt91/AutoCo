import { useEffect } from "react";
import { useState } from "react";

export function useCache(cacheName, key) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const cache = localStorage.getItem(cacheName);
    const obj = {};
    if (cache && cache.key) {
      obj.data = JSON.parse(cache.key);
    }
    setValue(obj);
  }, [cacheName, key]);

  return value;
}
