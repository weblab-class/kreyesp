import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { UserContext } from "../App";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "395785444978-7b9v7l0ap2h3308528vu1ddnt3rqftjc.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  const goToProfile = () => {
    navigate(`/profile/${userId}`);
  };


  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Work In Progress Cooking</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {props.userId && (
          <Link to={`/profile/${userId}`} className="NavBar-link" onClick={goToProfile}>
            Profile
          </Link>
        )}
        <Link to="/search" className="NavBar-link">
          Search
        </Link>
        <Link to="/feed" className="NavBar-link">
          Feed
        </Link>


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

      </div>
    </nav>
  );
};

export default NavBar;
