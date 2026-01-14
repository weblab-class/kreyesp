import React, { useEffect, useState } from "react";
import {post} from "../../utilities";
import "./TextBox.css";

const TextBox = (props) => {
  const [inp, setInput] = useState("");

  const changeBox = (event) => {
    setInput(event.target.value);

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    const body = {description:inp, imgurl:"", title:""};
    post("/api/food-post", body).then(props.addNewPost);
    setInput("");
  };



  return (
    <div className="TextBox-component">
      <label className="TextBox-label">{props.label}</label>

      <div className="TextBox-row">
        <textarea
          className="TextBox-textarea"
          value={inp}
          onChange={changeBox}
          rows={props.rows??1}
          cols={props.cols}
        />

        <button className="TextBox-button" onClick={handleSubmit}>Enter</button>
      </div>
    </div>
  );
};

export default TextBox;
