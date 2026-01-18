import React, { useContext, useEffect } from "react";
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

  const recipe = state.recipe;

  return (
    <div className="Recipe-container">
      <PageTitle title={recipe.meal_name} description="" />

      <RecipeDisplay image={recipe.image} meal_name={recipe.meal_name} ingredients={recipe.ingredients} measurements={recipe.measurements} instructions = {recipe.instructions}/>
    </div>
  );
};

export default Recipe;
