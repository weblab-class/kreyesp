import React, { useEffect, useState } from "react";
import {post, get} from "../../utilities";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [inp, setInput] = useState("");

  const changeBox = (event) => {

    setInput(event.target.value);
    console.log("Changed value: " + inp)

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(inp)
    const body = {food_name: inp};
    console.log(body)
    get("/api/mongo-recipe", body).then((recipes)=>console.log(recipes));
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
