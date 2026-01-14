const mongoose = require("mongoose");

const FoodPostSchema = new mongoose.Schema({
  description:String,
  posterid: String,
  imgurl:String,
  title:String,
});

// compile model from schema
module.exports = mongoose.model("food-post", FoodPostSchema);
