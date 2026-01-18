import React, { useEffect, useState } from "react";
import "./RecipeDisplay.css";

const RecipeDisplay = (props) => {
  return (
    <div className="RecipeDisplay-component" onClick={props.onClick}>
      <img
        className="RecipeDisplay-image"
        src={props.image}
        alt={props.meal_name}
      />
      <h2>Ingredients</h2>
      <div>
        {props.ingredients.map((ingredient, i) => (
          <h4 key={i}>
            {ingredient}: {props.measurements[i]}{" "}
          </h4>
        ))}
      </div>

      <h2>Directions</h2>
      <h4 className="RecipeDisplay-instructions">{props.instructions}</h4>
    </div>
  );
};

export default RecipeDisplay;
