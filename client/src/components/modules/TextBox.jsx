import React, { useEffect, useState } from "react";
import "./TextBox.css";

const TextBox = (props) => {
  const [inp, setInput] = useState("");

  const changeBox = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="TextBox-component">
      <label className="TextBox-label">
        {props.label}
      </label>

        <div className="TextBox-row">
      <textarea
          className="TextBox-textarea"
          value={inp}
          onChange={changeBox}
          rows={props.rows} 
          cols={props.cols} 
        />

      <button className="TextBox-button">Enter</button>
      </div>
    </div>
  );
};

export default TextBox;
