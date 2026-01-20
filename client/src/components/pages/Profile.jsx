import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Profile.css";
import foodBanner from "../assets/Chinese-Cooking-Hacks.png";
import tacos from "../assets/tacos.jpg";
import custom_recipe_banner from "../assets/Custom_Recipe_Banner.png";

import { UserContext } from "../App";

import TextBox from "../modules/TextBox";
import PageTitle from "../modules/PageTitle";
import FoodBlock from "../modules/FoodBlock";
import CustomRecipe from "../modules/CustomRecipe";
import NavBar from "../modules/NavBar";
import {poster_name} from  "../App";
import { post, get } from "../../utilities";
import {useNavigate, useLocation} from "react-router-dom";


const Profile = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  const [customRecipes, setCustomRecipes] = useState([]);
  
  const navigate = useNavigate();

  //get all custom recipes to appear
    useEffect(() => {
      const body = {};
      get("/api/profile-recipes", body).then((recipes) =>
        setCustomRecipes(recipes)
      );
      //////////////USERNAME RESETS UPON REFRESH, NEED TO FIGURE OUT HOW TO FIX THAT
      // setUsername(username);
    }, []);

    //move to the recipe if click on preview
  const handleClick = (recipe) => {
    navigate("/recipe", { state: { recipe: recipe } });
  };

  return (
    <div className="Profile-container">
      
      <PageTitle
        title="Profile"
        description=""
      />

      <h2>{poster_name}</h2>

      {customRecipes.map((result, i) => (
          <FoodBlock
            key={i}
            image_src={result.image}
            title={result.meal_name}
            onClick={() => handleClick(result)}
          />
        ))}


    </div>
  );
};

export default Profile;
