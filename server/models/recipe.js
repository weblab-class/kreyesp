const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
        meal_name: String,
        instructions: String,
        image: String,
        ingredients: Array,
        measurements: Array
    });

// compile model from schema
module.exports = mongoose.model("recipe", RecipeSchema);
