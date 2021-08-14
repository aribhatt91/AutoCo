import { useEffect } from "react";
import { useState } from "react";

export function useCache(cacheName, key) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const cache = localStorage.getItem(cacheName);
    if (!cache || !cache.key) {
      setValue({});
    } else {
      const obj = {};
      obj.data = JSON.parse(cache.key);
      setValue(obj);
    }
  }, [value]);

  return value;
}
