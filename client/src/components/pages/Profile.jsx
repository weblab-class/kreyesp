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
import {useNavigate, useLocation, useParams} from "react-router-dom";
import FoodPostDisplay from "../modules/FoodPostDisplay";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";


const Profile = () => {
  const { logged_in_user, handleLogin, handleLogout } = useContext(UserContext);

  const {userId} = useParams();

  const [customRecipes, setCustomRecipes] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [showPost, setShowPost] = useState(false);
    const [postDisplayed, setPostDisplayed] = useState("");

  const navigate = useNavigate();

  //get all custom recipes to appear
    useEffect(() => {
      const body = {
        req_user:userId
      };
      get("/api/profile-recipes", body).then((recipes) =>
        setCustomRecipes(recipes)
      );

      get("/api/profile-posts", body).then((posts) =>
        setPosts(posts)
      );


      get("/api/user-name").then((user)=>{
        setName(user.name)
    })
    }, []);



    //move to the recipe if click on preview
  const handleClick = (recipe) => {
    navigate("/recipe", { state: { recipe: recipe } });
  };

  const handlePostClick = (post)=>{
    setShowPost(true)
    setPostDisplayed(post)
     open();
  };

  const handleClose = ()=>{
    setShowPost(false)
  };

  console.log()

  const goToProfile = () => {
    navigate(`/profile/${postDisplayed.posterid}`);
  };

  return (
    <div className="Profile-container">
    {/* Makes the foodpost load conditionally */}
        <>
      <Modal
        opened={opened}
        onClose={close}
        title={postDisplayed.poster_name}
        centered
        size="xl"
      >
        <div>
          <FoodPostDisplay
            image_src={postDisplayed.imgurl}
            title={<div onClick={goToProfile}>{postDisplayed.poster_name}</div>}
            description={postDisplayed.description}
            onClose={close}
          />
        </div>
      </Modal>
    </>

      <PageTitle
        title="Profile"
        description=""
      />

      <h2>{(posts.length>0)?posts[0].poster_name : name}</h2>
      <div>
        <h3>Recipes</h3>
        {customRecipes.map((result, i) => (
          <FoodBlock
            key={i}
            image_src={result.image}
            title={result.meal_name}
            onClick={() => handleClick(result)}
          />
        ))}
      </div>

      <div>
        <h3>Posts</h3>

        {posts.map((post, i) => (
        <FoodBlock
          key={i}
          poster_name={post.poster_name}
          image_src={post.imgurl}
          title={post.title}
          description={post.description}
          onClick={()=>handlePostClick(post)
          }
        />
      ))}
      </div>



    </div>
  );
};

export default Profile;
