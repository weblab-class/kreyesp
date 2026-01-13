import React, { useEffect, useState } from "react";
import "./CustomRecipe.css";
import TextBox from "./TextBox"; 


const CustomRecipe = (props) => {
  return (
    <div className="CustomRecipe-component">
        <h1 className="CustomRecipe-title">Save Your Own:</h1>
        <TextBox className="CustomRecipe-recipeName" label="Name" rows={1} cols={50}/>
        <TextBox className="CustomRecipe-ingredients" label="Ingredients" rows={1} cols={50}/>
        <TextBox className="CustomRecipe-instructions" label="Instructions" rows={1} cols={50}/>
        <button>Save</button>
    </div>
  );
};

export default CustomRecipe;
