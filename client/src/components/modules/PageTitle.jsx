import React, { useEffect, useState } from "react";
import "./PageTitle.css";

const PageTitle = (props) => {
  return (
    <div className="Title-component">
      <h1 className="Title-text">{props.title}</h1>
      <h3 className="Title-description">{props.description}</h3>
    </div>
  );
};


export default PageTitle;