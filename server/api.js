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

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

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
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/food-post", (req, res) => {
  const newFoodPost = new FoodPost({
    description:req.body.description,
    poster_name: req.body.poster_name,
    posterid: req.user._id,
    imgurl:req.body.imgurl,
    title:req.body.title
  });

  newFoodPost.save().then((food_post)=>res.send(food_post));
});

router.get("/food-post", (req, res) => {
  FoodPost.find({ }).then((food_posts) => {
    res.send(food_posts)}).catch((error)=>{console.log(error);
      res.status(500).send({ error: "Failed to fetch food posts" });;
  });
});



//api's to cloudinary
router.post("/uploaded-image", upload.single("image"), (req, res) =>{
  const dataUri = req.body.dataUri;

  //no file uploaded
  if (!dataUri) {
    return res.status(400).send({ error: "Missing dataUri" });
  }


  cloudinary.uploader.upload(
    dataUri, {
      folder: "food_posts",
        transformation: [{ width: 280, height: 280, crop: "fill", gravity: "auto" }],
    }).then((result)=>{
      res.send({imgurl:result.secure_url});
    }).catch((err) => {
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
