import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CONSTANTS from "../../data/constants.json";
import useOptimisedFetch from "../../adapter/hooks/useOptimisedFetch";
import NotFound from "../NotFound";

const CACHE_NAME = "stocks";
let KEY = "";
export default function Detail() {
  let { symbol } = useParams();
  KEY = symbol;
  const [fromCache, setFromCache] = useState(true);
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });
  const url = `${CONSTANTS.BASE_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${CONSTANTS.API_KEY}`;

  const { response, error, loading } = useOptimisedFetch({
    cacheName: CACHE_NAME,
    url,
    key: symbol,
    fromCache
  });
  const refresh = () => {
    console.log("Invalidating cache");
    setFromCache(false);
    setState({
      loading: true,
      error: null,
      data: null
    });
  };
  useEffect(() => {
    let interval = setInterval(refresh, 120000);
    //return clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(response);
    if (response) {
      setState({
        loading: false,
        error,
        data: response
      });
      setFromCache(true);
    }
  }, [response]);

  return (
    <div className="page detail-page">
      <div className="container">
        {state.loading && <div>Loading...</div>}
        {!state.loading && state.data && state.data["Symbol"] && (
          <article>
            <h1>{state.data["Name"]}</h1>
            <h4>{"Symbol: " + state.data["Symbol"]}</h4>
            <p>{state.data["Description"]}</p>

            <h4>{"Current value: " + state.data["AnalystTargetPrice"]}</h4>
          </article>
        )}
        {!state.loading && (!state.data || !state.data["Symbol"]) && (
          <>
            <NotFound />
            <div className="btn-container">
              <button
                type="button"
                onClick={() => {
                  setFromCache(false);
                }}
              >
                Refresh
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
