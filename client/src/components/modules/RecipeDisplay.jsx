import React, { useEffect, useState } from "react";
import "./RecipeDisplay.css";

const RecipeDisplay = (props) => {
  return (
    <div className="RecipeDisplay-component" onClick={props.onClick}>
      <div className="RecipeDisplay-top-screen">
        <img
          className="RecipeDisplay-image"
          src={props.image}
          alt={props.meal_name}
        />

        <div className="RecipeDisplay-ingredients">
          <h2>Ingredients</h2>
          {props.ingredients.map((ingredient, i) => (
            <h3 key={i}>
              {ingredient}: {props.measurements[i]}{" "}
            </h3>
          ))}
        </div>
      </div>

      <div className="RecipeDisplay-instructions">
        <h2>Directions</h2>
        <h3>{props.instructions}</h3>
      </div>
    </div>
  );
};

export default RecipeDisplay;
