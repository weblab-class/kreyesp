import React, { useEffect, useState } from "react";
import "./FoodBlock.css";


const FoodBlock = (props) => {
  return (
    <div className="FoodBlock-component">
      <h2>{props.poster_name}</h2>
      <img className="FoodBlock-image" src={props.image_src} alt="Food Image" />
      <h3 className="FoodBlock-name">{props.title}</h3>
      <h4 className="FoodBlock-description">{props.description}</h4>
    </div>
  );
};

export default FoodBlock;
