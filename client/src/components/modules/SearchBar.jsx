import React, { useEffect, useState } from "react";
import {post, get} from "../../utilities";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [inp, setInput] = useState("");

  const changeBox = (event) => {

    setInput(event.target.value);
    

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event)=>{
    event.preventDefault();

    const body = {food_name: inp};

    get("/api/mongo-recipe", body).then(props.getResults);
    setInput("");
  };



  return (
    <div className="SearchBar-component">
      <label className="SearchBar-label">{props.label}</label>

      <div className="SearchBar-row">
        <textarea
          className="SearchBar-textarea"
          value={inp}
          onChange={changeBox}
          rows={props.rows??1}
          cols={props.cols}
        />

        <button className="SearchBar-button" onClick={handleSubmit}>Enter</button>
      </div>
    </div>
  );
};

export default SearchBar;
