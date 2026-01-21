const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
        is_public:Boolean,
        is_custom:Boolean,
        user_id:String,
        meal_name: String,
        instructions: String,
        image: String,
        ingredients: Array,
        measurements: Array
    });

// compile model from schema
module.exports = mongoose.model("recipe", RecipeSchema);
