/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const FoodPost = require("./models/food-post");
const Recipe = require("./models/recipe");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

//
const axios = require("axios");
var util = require("util");

//cloudinary routes
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// store file in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(
      req.user,
      socketManager.getSocketFromSocketID(req.body.socketid)
    );
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

//Feed mongoDB requests
router.post("/food-post", (req, res) => {
  const newFoodPost = new FoodPost({
    description: req.body.description,
    poster_name: req.body.poster_name,
    posterid: req.user._id,
    imgurl: req.body.imgurl,
    title: req.body.title,
  });

  newFoodPost.save().then((food_post) => res.send(food_post));
});

router.get("/food-post", (req, res) => {
  FoodPost.find({})
    .then((food_posts) => {
      res.send(food_posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Failed to fetch food posts" });
    });
});

//Recipe MongoDB requests
router.get("/mongo-recipe", (req, res) => {
  //$options: "i" does case insensitive
  Recipe.find({ meal_name: { $regex: req.query.food_name, $options: "i" } })
    .limit(20)
    .then((recipes) => {
      //Check to see if there is a recipe in the mongodb, if now, we make a call to external recipe api

      if (recipes.length !== 0) {
        res.send(recipes);
      } else {
        //check external api

        getExternalRecipes(req.query.food_name).then((external_recipes) => {
          if (external_recipes.length !== 0) {
            //send recipes to mongodb
            for (const [index, external_recipe] of external_recipes.entries()) {
              storeRecipe(external_recipe);
            }
            res.send(external_recipes);
          } else {
            //if no external recipes, send out an empty array
            res.send([]);
          }
        });
      }
    });
});

const storeRecipe = (recipe) => {
  const newRecipe = new Recipe({
    is_custom: false,
    user_id: null,
    meal_name: recipe.meal_name,
    instructions: recipe.instructions,
    image: recipe.image,
    ingredients: recipe.ingredients,
    measurements: recipe.measurements,
  });
  newRecipe.save();
};

router.post("/mongo-recipe", (req, res) => {
  const newRecipe = new Recipe({
    is_custom: true,
    user_id: req.user._id,
    meal_name: req.body.meal_name,
    instructions: req.body.instructions,
    image: req.body.image,
    ingredients: req.body.ingredients,
    measurements: req.body.measurements,
  });

  newRecipe.save().then((recipe) => res.send(recipe));
});

//Recipe api requests (currently MealDB)
const recipe_website = "https://www.themealdb.com/api/json/v1/1/search.php";

const getExternalRecipes = async (food_name) => {
  const response = await axios.get(recipe_website + "?s=" + food_name);

  const meal_response = response.data.meals;
  let recipes = [];

  if(meal_response){for (const [index, meal] of meal_response.entries()) {
    const ingredients = [];
    const measurements = [];

    for (let i = 1; i < 21; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measurement = meal[`strMeasure${i}`];

      if (ingredient !== "" && measurement !== "") {
        ingredients.push(ingredient);
        measurements.push(measurement);
      }
    }

    const recipe_info = {
      meal_name: meal["strMeal"],
      instructions: meal["strInstructions"],
      image: meal["strMealThumb"],
      ingredients: ingredients,
      measurements: measurements,
    };

    recipes.push(recipe_info);

    console.log(recipe_info);
    // console.log("This is meal #" + index);
    // console.log(util.inspect(meal));
  }}

  

  // console.log(util.inspect(response.data.meals));
  return recipes;
};

// router.get("/recipe", async (req, res) => {
//   const food_name = req.query.food_name;
//   const response = await axios.get(recipe_website + "?s=" + food_name);

//   const meal_response = response.data.meals;
//   let recipes = [];

//   for (const [index, meal] of meal_response.entries()) {

//     const ingredients = [];
//     const measurements = [];

//     for (let i = 1; i<21; i++){
//       const ingredient = meal[`strIngredient${i}`];
//       const measurement = meal[`strMeasure${i}`];

//       if (ingredient !== "" && measurement !== "") {
//         ingredients.push(ingredient);
//         measurements.push(measurement)
//       }
//     }

//     const recipe_info = {meal_name: meal["strMeal"],
//         instructions: meal["strInstructions"],
//         image: meal["strMealThumb"],
//         ingredients: ingredients,
//         measurements: measurements
//     }

//     recipes.push(recipe_info)

//     console.log(recipe_info)

//     // console.log("This is meal #" + index);
//     // console.log(util.inspect(meal));
//   };

//   // console.log(util.inspect(response.data.meals));
//   res.send(recipes);
// });




//random recipes for homepage
router.get("/random-recipes", (req, res) => {
  //get 3 random samples
  Recipe.aggregate([{$sample:{size:3}}]).then((random_samples)=>{res.send(random_samples)});

})





//api's to cloudinary
//food-posts image upload
router.post("/uploaded-image", upload.single("image"), (req, res) => {
  const dataUri = req.body.dataUri;

  //no file uploaded
  if (!dataUri) {
    return res.status(400).send({ error: "Missing dataUri" });
  }

  cloudinary.uploader
    .upload(dataUri, {
      folder: "food_posts",
      transformation: [
        { width: 280, height: 280, crop: "fill", gravity: "auto" },
      ],
    })
    .then((result) => {
      //return the image url
      res.send({ imgurl: result.secure_url });
    })
    .catch((err) => {
      console.error("Cloudinary upload error:", err);
      res.status(500).send({ error: "Cloudinary upload failed" });
    });
});

//custom recipe image upload
router.post("/custom-recipe-image", upload.single("image"), (req, res) => {
  const dataUri = req.body.dataUri;

  //no file uploaded
  if (!dataUri) {
    return res.status(400).send({ error: "Missing dataUri" });
  }

  cloudinary.uploader
    .upload(dataUri, {
      folder: "custom_recipes",
      transformation: [
        { width: 280, height: 280, crop: "fill", gravity: "auto" },
      ],
    })
    .then((result) => {
      //return the image url
      res.send({ imgurl: result.secure_url });
    })
    .catch((err) => {
      console.error("Cloudinary upload error:", err);
      res.status(500).send({ error: "Cloudinary upload failed" });
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
