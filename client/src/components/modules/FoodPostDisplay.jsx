import React, { useEffect, useState } from "react";
import "./FoodPostDisplay.css";

const FoodPostDisplay = (props) => {
  return (
    <div className="FoodPostDisplay-component" onClick={props.onClick}>

      <div className="FoodPostDisplay-body">

        <img
          className="FoodPostDisplay-image"
          src={props.image_src}
          alt="Food Image"
        />
        <div>
          <h2 className="FoodPostDisplay-name">{props.poster_name}</h2>
          <div className="FoodPostDisplay-info">
            <h3 className="FoodPostDisplay-title">{props.title}</h3>
            <h4 className="FoodPostDisplay-description">{props.description}</h4>
          </div>
        </div>
        {/* <button onClick={props.onClose}>x</button> */}
      </div>
    </div>
  );
};

export default FoodPostDisplay;
