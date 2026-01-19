import React, { useEffect, useState } from "react";
import "./CustomRecipe.css";
import TextBox from "./TextBox";

const CustomRecipe = (props) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [measurements, setMeasurements] = useState([""]);
  const [instructions, setInstructions] = useState("");

  const autoResizeBox = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const changeName = (event) => {
    setName(event.target.value);
    autoResizeBox(event);
  };

  const changeIngredients = (i, event) => {
    //create copy of array
    const new_ingredients = [...ingredients];
    new_ingredients[i] = event.target.value
    setIngredients(new_ingredients);
  };

  const changeMeasurements = (i, event) => {
    //create copy of array
    const new_measurements = [...measurements];
    new_measurements[i] = event.target.value
    setMeasurements(new_measurements);
  };


  const changeInstructions = (event) => {
    setInstructions(event.target.value);
    autoResizeBox(event);
  };

  const handleAdd = ()=>{
    setIngredients([...ingredients, ""]);
    setMeasurements([...measurements, ""]);
  }

  const handleRemove = (i)=>{
    //create copy of array
    const new_ingredients = [...ingredients];
    const new_measurements = [...measurements];
    new_ingredients.splice(i, 1)
    new_measurements.splice(i, 1)
    setIngredients(new_ingredients);
    setMeasurements(new_measurements);
  }

  return (
    <div className="CustomRecipe-component">
      <h1 className="CustomRecipe-title">Save Your Own:</h1>

      <label className="CustomRecipe-label-name">Name</label>
      <textarea
        className="CustomRecipe-name"
        value={name}
        onChange={changeName}
        rows={props.rows ?? 1}
        cols={props.cols}
      />

      <div className="CustomRecipe-ingredients-component">
        <label className="CustomRecipe-label-ingredients">Ingredients and Measurment</label>
        <button className="CustomRecipe-add-ingredient" onClick={handleAdd}>+</button>
        {/* Creates dynamic ingredients lists */}
        {ingredients.map((ingredient, i) => (
          <div key={i} className="CustomRecipe-ingredient-measurement-row">
            <textarea
              className="CustomRecipe-ingredients"
              value={ingredient}
              onChange={(event)=>changeIngredients(i,event)}
              rows={props.rows ?? 1}
              cols={props.cols}
            />
            <textarea
              className="CustomRecipe-measurements"
              value={measurements[i]}
              onChange={(event)=>changeMeasurements(i,event)}
              rows={props.rows ?? 1}
              cols={props.cols}
            />
            <button className="CustomRecipe-remove-ingredient" onClick={()=>handleRemove(i)}>-</button>
          </div>
        ))}
      </div>

      <label className="CustomRecipe-label-instructions">Instructions</label>
      <textarea
        className="CustomRecipe-instructions"
        value={instructions}
        onChange={changeInstructions}
        rows={props.rows ?? 1}
        cols={props.cols}
      />
      <button>Save</button>
    </div>
  );
};

export default CustomRecipe;
