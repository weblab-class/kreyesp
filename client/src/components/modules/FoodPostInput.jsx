import React, { useEffect, useState } from "react";
import { post, get } from "../../utilities";
import "./FoodPostInput.css";

import {poster_name} from  "../App";

const FoodPostInput = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const autoResizeBox = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
    autoResizeBox(event);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
    autoResizeBox(event);
  };

  const changeImage = (event) => {
    const file = event.target.files[0] ?? null;
    setImage(file);
  };

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
    // do a post to cloudinary
    let imgurl = "";

    if (image) {
      fileToDataUri(image)
        .then((dataUri) => {
          //do post to cloudinary
          return post("/api/uploaded-image", { dataUri });
        })
        .then((res) => {
          //do post to mongodb
          const body = {
            description: description,
            poster_name: poster_name,
            imgurl: res.imgurl,
            title: title,

          };
          post("/api/food-post", body).then(props.addNewPost);
          setTitle("");
          setDescription("");
          setImage(null);

          //reset the image upload area after post upload
          const fileInput = document.getElementById("imageUpload");
          if (fileInput) fileInput.value = "";
        });
    }
  };

  return (
    <div className="FoodPostInput-component">
      <label className="FoodPostInput-label">Share Your Meal!</label>
      <label htmlFor="imageUpload">Choose an image to upload:</label>

      {/* Image upload button */}
      <form
        className="FoodPostInput-image-upload"
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

      <label className="FoodPostInput-label-title">Name</label>
      <textarea
        className="FoodPostInput-title"
        value={title}
        onChange={changeTitle}
        rows={props.rows ?? 1}
        cols={props.cols}
      />

      <label className="FoodPostInput-label-title">Description</label>
      <textarea
        className="FoodPostInput-description"
        value={description}
        onChange={changeDescription}
        rows={props.rows ?? 1}
        cols={props.cols}
      />

      <button className="FoodPostInput-button" onClick={handleSubmit}>
        Post
      </button>
    </div>
  );
};

export default FoodPostInput;
