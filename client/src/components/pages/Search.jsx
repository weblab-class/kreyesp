import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {useNavigate, useLocation} from "react-router-dom";

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
  
  const navigate = useNavigate();
  const { state } = useLocation();
  //handles case where we have results from another page, or if we don't have anything we just initialize empty array
  const [results, setResults] = useState(state?.results ??[]);

  useEffect(()=>{
    if(state?.results){
      navigate(".", {replace:true, state:[]})
    }
  },[])



  const getResults = (x) => {
    setResults([...x]);
  };

  console.log(results)

  const handleClick = (recipe) =>{
    navigate("/recipe", {state:{recipe:recipe}});
  }

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

      {results.length>0 && results.map((result, i) => (
    <FoodBlock
      key={i}
      image_src={result.image}
      title={result.meal_name}
      onClick={()=>handleClick(result)}
    />
  ))}
    </div>
  );
};

export default Search;
