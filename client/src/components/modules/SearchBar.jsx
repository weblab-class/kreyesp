import React, { useEffect, useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [inp, setInput] = useState("");

  const changeBox = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="SearchBar-component">
      <label className="SearchBar-label">
        Search

      </label>

        <div className="SearchBar-row">
      <textarea
          className="SearchBar-textarea"
          value={inp}
          onChange={changeBox}
          rows={1} 
          cols={100} 
        />

      <button className="SearchBar-button">Enter</button>
      </div>
    </div>
  );
};

export default SearchBar;
