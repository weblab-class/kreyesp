import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Search.css";
import foodBanner from "../assets/Chinese-Cooking-Hacks.png";
import tacos from "../assets/tacos.jpg";
import custom_recipe_banner from "../assets/Custom_Recipe_Banner.png";

import { UserContext } from "../App";

import SearchBar from "../modules/SearchBar";
import PageTitle from "../modules/PageTitle";
import FoodBlock from "../modules/FoodBlock";
import CustomRecipe from "../modules/CustomRecipe";
import NavBar from "../modules/NavBar";

const Search = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [results, setResults] = useState([]);

  const getResults = (x) => {
    setResults([...x]);
  };

  console.log(results)

  return (
    <div className="Search-container">
      <PageTitle title="Search" description="" />

      <div className="Search-row">
        <SearchBar
          className="Search-bar"
          label="Search"
          rows={1}
          cols={100}
          getResults={getResults}
        />
      </div>
    </div>
  );
};

export default Search;
