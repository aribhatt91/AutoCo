import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../adapter/hooks/useDebounce";
import CONSTANTS from "../../data/constants.json";
import axios from "axios";

function AutoComplete({ loading, selectFn, items }) {
  return (
    <div className="autocomplete-box">
      {loading && <div></div>}
      {!loading && items && items.length > 0 && (
        <ul onClick={selectFn}>
          {items.map((item, index) => (
            <li className="autocomplete-list-item">
              <Link to={"/stock/" + item["1. symbol"]}>
                {item["1. symbol"]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SearchBar() {
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [query, setQuery] = useState("");
  const dedouncedQuery = useDebounce(query, 500);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", () => {});
  }, []);

  const eraseQuery = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setQuery("");
      setShowAutoComplete(false);
      setLoading(false);
    }
  };
  const buildSearchQuery = () => {
    const url = `${CONSTANTS.BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${dedouncedQuery}&apikey=${CONSTANTS.API_KEY}`;
    return encodeURI(url);
  };

  async function search() {
    if (!query || query.trim() === "") {
      return;
    }
    setLoading(true);
    setResults([]);
    try {
      const URL = buildSearchQuery();
      const res = await axios.get(URL);
      const data = res.data;
      console.log("fetch", res.data);
      setResults(data.bestMatches);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    search();
  }, [dedouncedQuery]);

  return (
    <div
      className="search-bar-container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={"search-bar" + (showAutoComplete ? " suggestions-open" : "")}
      >
        <button className="icon-btn btn-search"></button>
        <input
          type="text"
          className="search-input"
          name="search"
          placeholder="Search for stocks"
          onChange={handleChange}
          value={query}
        />
        <button className="icon-btn btn-cancel" onClick={eraseQuery}></button>
      </div>
      <AutoComplete items={results} loading={loading} />
    </div>
  );
}
