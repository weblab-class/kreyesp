import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { post, get } from "../../utilities";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./Skeleton.css";
import foodBanner from "../assets/Chinese-Cooking-Hacks.png";
import tacos from "../assets/tacos.jpg";
import custom_recipe_banner from "../assets/Custom_Recipe_Banner.png";

import { UserContext } from "../App";

import SearchBar from "../modules/SearchBar";
import PageTitle from "../modules/PageTitle";
import FoodBlock from "../modules/FoodBlock";
import CustomRecipe from "../modules/CustomRecipe";
import NavBar from "../modules/NavBar";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [foodPreviews, setFoodPreviews] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  //search results
  const getResults = (x) => {
    setResults([...x]);
    navigate("/search", { state: { results: x } });
  };

  //move to the recipe if click on preview
  const handleClick = (recipe) => {
    navigate(`/recipe/${recipe._id}`, { state: { recipe: recipe } });
  };

  //render 3 random recommendations
  useEffect(() => {
    const body = {};
    get("/api/random-recipes", body).then((recipes) =>
      setFoodPreviews(recipes)
    );
  }, []);

  return (
    <div className="Skeleton-container">
      <PageTitle title="Work In Progress Cooking" description="" />

      <img className="Food-banner" src={foodBanner} alt="food banner" />

      <div className="Search-row">
        <SearchBar
          className="Search-bar"
          label="Search"
          rows={1}
          cols={100}
          getResults={getResults}
        />
      </div>

      {/* Food Recommendation Component */}
      <div className="FoodGrid">
        <h1>Try These!</h1>
        {foodPreviews.map((result, i) => (
          <FoodBlock
            key={i}
            image_src={result.image}
            title={result.meal_name}
            onClick={() => handleClick(result)}
          />
        ))}

        {/* Custom Recipe Component */}
        <div className="CustomRecipeRow">
          <CustomRecipe title="Save Your Own!" recipe={null}/>
          <img
            className="CustomRecipeBanner"
            src={custom_recipe_banner}
            al="Custom Recipe Banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
