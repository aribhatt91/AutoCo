import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CONSTANTS from "../../data/constants.json";

const CACHE_NAME = "stocks";

export default function Detail() {
  let { symbol } = useParams();
  const url = `${CONSTANTS.BASE_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${CONSTANTS.API_KEY}`;

  /* const { response, error, loading } = useOptimisedFetch({
    cacheName: CACHE_NAME,
    url,
    key: symbol
  }); */

  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });

  /* useEffect(() => {
    console.log(response);
    if (response) {
      setState({
        loading: false,
        error,
        data: response
      });
    }
  }, [response]); */

  return (
    <div>
      {state.loading && <div>Loading</div>}
      {!state.loading && state.data && <div>{JSON.stringify(state.data)}</div>}
    </div>
  );
}
