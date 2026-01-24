import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./Recipe.css";
import foodBanner from "../assets/Chinese-Cooking-Hacks.png";
import tacos from "../assets/tacos.jpg";
import custom_recipe_banner from "../assets/Custom_Recipe_Banner.png";

import { UserContext } from "../App";

import TextBox from "../modules/TextBox";
import PageTitle from "../modules/PageTitle";
import FoodBlock from "../modules/FoodBlock";
import CustomRecipe from "../modules/CustomRecipe";
import NavBar from "../modules/NavBar";
import RecipeDisplay from "../modules/RecipeDisplay";

const Recipe = () => {
  // meal_name: String,
  // instructions: String,
  // image: String,
  // ingredients: Array,
  // measurements: Array
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const { state } = useLocation();

  const [editing, setEditing] = useState(false)

  // const [recipe, setRecipe] = useState(state?.recipe);

    useEffect(()=>{
      if(state?.results){
        navigate(".", {replace:true, state:[]})
      }
    },[]);

  const recipe = state.recipe;

  const handleEdit = ()=>{
    setEditing(true)
  };

  const handleCancel = ()=>{
    setEditing(false)
  };

  return editing?(
  <div>
     <CustomRecipe title="Edit Your Recipe" recipe = {recipe}/>
     <button onClick={handleCancel}>Cancel</button>

  </div>)
  :(
    <div className="Recipe-container">
      <PageTitle title={recipe.meal_name} description="" />
      <button onClick={handleEdit}>Edit Recipe</button>

      <RecipeDisplay image={recipe.image} meal_name={recipe.meal_name} ingredients={recipe.ingredients} measurements={recipe.measurements} instructions = {recipe.instructions}/>
    </div>
  );
};

export default Recipe;
