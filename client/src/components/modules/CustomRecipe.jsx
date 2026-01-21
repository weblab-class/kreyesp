import React, { useContext, useEffect, useState } from "react";
import "./CustomRecipe.css";
import { post, get } from "../../utilities";
import TextBox from "./TextBox";
import { UserContext } from "../App";

const CustomRecipe = (props) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [measurements, setMeasurements] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [is_public, setIs_Public] = useState(false);
  const [is_public_text, setIs_Public_Text] = useState("Private");

  const autoResizeBox = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const changeImage = (event) => {
    const file = event.target.files[0] ?? null;
    setImage(file);
  };

  const changeName = (event) => {
    setName(event.target.value);
    autoResizeBox(event);
  };

  const changeIngredients = (i, event) => {
    //create copy of array
    const new_ingredients = [...ingredients];
    new_ingredients[i] = event.target.value;
    setIngredients(new_ingredients);
  };

  const changeMeasurements = (i, event) => {
    //create copy of array
    const new_measurements = [...measurements];
    new_measurements[i] = event.target.value;
    setMeasurements(new_measurements);
  };

  const changeInstructions = (event) => {
    setInstructions(event.target.value);
    autoResizeBox(event);
  };

  const handleAdd = () => {
    setIngredients([...ingredients, ""]);
    setMeasurements([...measurements, ""]);
  };

  const handleRemove = (i) => {
    //create copy of array
    const new_ingredients = [...ingredients];
    const new_measurements = [...measurements];
    new_ingredients.splice(i, 1);
    new_measurements.splice(i, 1);
    setIngredients(new_ingredients);
    setMeasurements(new_measurements);
  };

  const handleCheck = () => {
    setIs_Public(!is_public);
    if (is_public_text === "Public") {
      setIs_Public_Text("Private");
    } else {
      setIs_Public_Text("Public");
    }
  };
  console.log(is_public)


  //encode file data at dataUri string
  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userId) {
      // do a post to cloudinary
      let imgurl = "";

      if (image && name) {
        fileToDataUri(image)
          .then((dataUri) => {
            //do post to cloudinary
            return post("/api/custom-recipe-image", { dataUri });
          })
          .then((res) => {
            //do post to mongodb
            const body = {
              is_public:is_public,
              meal_name: name,
              instructions: instructions,
              image: res.imgurl,
              ingredients: ingredients,
              measurements: measurements,
            };
            post("/api/mongo-recipe", body).then();
            setIngredients([""]);
            setMeasurements([""]);
            setName("");
            setInstructions("");
            setImage(null);

            //reset the image upload area after post upload
            const fileInput = document.getElementById("imageUpload");
            if (fileInput) fileInput.value = "";
          });
      }
    } else {
      if (!userId) {
        alert("Please log in to save a recipe.");
      }
      if (!image) {
        alert("Please upload an image");
      }
      if (!name) {
        alert("Please upload a name");
      }
    }
  };

  return (
    <div className="CustomRecipe-component">
      <h1 className="CustomRecipe-title">Save Your Own:</h1>

      <div className="CustomRecipe-checkbox-row">

        <input
          type="checkbox"
          checked={is_public}
          onChange={handleCheck}
        ></input>
         <label>{is_public_text}</label>
      </div>

      <label htmlFor="imageUpload">Choose an image to upload:</label>
      {/* Image upload button */}
      <form
        className="CustomRecipe-image-upload"
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
        <input
          type="file"
          id="imageUpload"
          name="image"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={changeImage}
        ></input>
      </form>

      <label className="CustomRecipe-label-name">Name</label>
      <textarea
        className="CustomRecipe-name"
        value={name}
        onChange={changeName}
        rows={props.rows ?? 1}
        cols={props.cols}
      />

      <div className="CustomRecipe-ingredients-component">
        <label className="CustomRecipe-label-ingredients">
          Ingredients and Measurment
        </label>
        <button className="CustomRecipe-add-ingredient" onClick={handleAdd}>
          +
        </button>
        {/* Creates dynamic ingredients lists */}
        {ingredients.map((ingredient, i) => (
          <div key={i} className="CustomRecipe-ingredient-measurement-row">
            <textarea
              className="CustomRecipe-ingredients"
              value={ingredient}
              onChange={(event) => changeIngredients(i, event)}
              rows={props.rows ?? 1}
              cols={props.cols}
            />
            <textarea
              className="CustomRecipe-measurements"
              value={measurements[i]}
              onChange={(event) => changeMeasurements(i, event)}
              rows={props.rows ?? 1}
              cols={props.cols}
            />
            <button
              className="CustomRecipe-remove-ingredient"
              onClick={() => handleRemove(i)}
            >
              -
            </button>
          </div>
        ))}
      </div>

      <label className="CustomRecipe-label-instructions">Instructions</label>
      <textarea
        className="CustomRecipe-instructions"
        value={instructions}
        onChange={changeInstructions}
        rows={props.rows ?? 1}
        cols={props.cols}
      />
      <button className="CustomRecipe-submit" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default CustomRecipe;
