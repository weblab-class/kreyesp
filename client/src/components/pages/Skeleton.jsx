import React, { useContext, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import foodBanner from "../assets/food_banner.jpg";
import tacos from "../assets/tacos.jpg";

import { UserContext } from "../App";

import SearchBar from "../modules/SearchBar";
import PageTitle from "../modules/PageTitle";
import FoodBlock from "../modules/FoodBlock";

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
      <SearchBar />
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
        <FoodBlock
          image_src={tacos}
          name="Tacos Al Pastor"
          description=""
        />
      </div>
    </div>
  );
};

export default Skeleton;
