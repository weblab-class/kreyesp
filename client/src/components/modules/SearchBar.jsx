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
          rows={1} // Optional: define default height
          cols={100} // Optional: define default width
        />

      <button className="SearchBar-button">Enter</button>
      </div>
    </div>
  );
};

export default SearchBar;
