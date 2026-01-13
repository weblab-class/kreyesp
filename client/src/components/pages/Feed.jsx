import React, { useContext, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Feed.css";
import foodBanner from "../assets/Chinese-Cooking-Hacks.png";
import tacos from "../assets/tacos.jpg";
import custom_recipe_banner from "../assets/Custom_Recipe_Banner.png";

import { UserContext } from "../App";

import TextBox from "../modules/TextBox";
import PageTitle from "../modules/PageTitle";
import FoodBlock from "../modules/FoodBlock";
import CustomRecipe from "../modules/CustomRecipe";
import NavBar from "../modules/NavBar";


const Feed = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <div className="Feed-container">
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
        title="Feed"
        description=""
      />


    </div>
  );
};

export default Feed;
