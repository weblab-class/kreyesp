import React, { useEffect, useState } from "react";
import {post, get} from "../../utilities";
import "./FoodPostInput.css";

const FoodPostInput = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const autoResizeBox = (event)=>{
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  const changeTitle = (event) => {
    setTitle(event.target.value);
    autoResizeBox(event);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
    autoResizeBox(event);
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    const body = {description:description, imgurl:"", title:title};
    post("/api/food-post", body).then(props.addNewPost);
    setTitle("");
    setDescription("");
  };



  return (
    <div className="FoodPostInput-component">
      <label className="FoodPostInput-label">Enter Your Custom Recipe!</label>
        <label className="FoodPostInput-label-title">Name</label>
        <textarea
          className="FoodPostInput-title"
          value={title}
          onChange={changeTitle}
          rows={props.rows??1}
          cols={props.cols}
        />

        <label className="FoodPostInput-label-title">Description</label>
        <textarea
          className="FoodPostInput-description"
          value={description}
          onChange={changeDescription}
          rows={props.rows??1}
          cols={props.cols}
        />

        <button className="FoodPostInput-button" onClick={handleSubmit}>Enter</button>
    </div>
  );
};

export default FoodPostInput;
