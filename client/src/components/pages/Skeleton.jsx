import React, { useContext, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import foodBanner from "../assets/food_banner.jpg";
import tacos from "../assets/tacos.jpg";
import custom_recipe_banner from "../assets/Custom_Recipe_Banner.png";

import { UserContext } from "../App";

import TextBox from "../modules/TextBox";
import PageTitle from "../modules/PageTitle";
import FoodBlock from "../modules/FoodBlock";
import CustomRecipe from "../modules/CustomRecipe";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <div className="Skeleton-container">
      <>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={(err) => console.log(err)}
          />
        )}
      </>
      <PageTitle
        title="Work In Progress Cooking"
        description="A New Way Of Cooking"
      />
      <img className="Food-banner" src={foodBanner} alt="food banner" />
      <TextBox label="Search" rows={1} cols={100} />

      {/* Food Recommendation Component */}
      <div className="FoodGrid">
        <h1>Try These!</h1>
        <FoodBlock
          image_src={tacos}
          name="Tacos Al Pastor"
          description="Good Food"
        />
        <FoodBlock
          image_src={tacos}
          name="Tacos Al Pastor"
          description="Good Food"
        />
        <FoodBlock image_src={tacos} name="Tacos Al Pastor" description="" />

        {/* Custom Recipe Component */}
        <div className="CustomRecipeRow">
          <CustomRecipe />
          <img className="CustomRecipeBanner" src={custom_recipe_banner} al="Custom Recipe Banner" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
