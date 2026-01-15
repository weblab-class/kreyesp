import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import {post, get} from "../../utilities";

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
import FoodPostInput from "../modules/FoodPostInput";

const Feed = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  const [posts, setPosts] = useState([{description:"t"}]);

  const addNewPost = (x)=>{setPosts([x, ...posts])};

  useEffect(() => {
    get("/api/food-post").then((food_posts) => {
      setPosts(food_posts.reverse());
    });
  }, []);

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
      <PageTitle title="Feed" description="" />

      <div className="Feed-row">
        <FoodPostInput className="Feed-bar" label="Feed" rows={1} cols={100} addNewPost={addNewPost}/>
      </div>

        {posts.map((post, i) => (
    <FoodBlock
      key={i}
      image_src={tacos} //imgurl in the future
      title={post.title}
      description={post.description}
    />
  ))}


    </div>
  );
};

export default Feed;
