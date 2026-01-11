import React, { useContext, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import foodBanner from "../assets/food_banner.jpg";

import { UserContext } from "../App";


import SearchBar from "../modules/SearchBar"; // example path

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
      <h1 className="Skeleton-title">Work In Progress Cooking</h1>
      <img className="Food-banner" src={foodBanner} alt="food banner" />
      <SearchBar />
    </div>
  );
};

export default Skeleton;
