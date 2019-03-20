import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavBar = props => {
   
  return (
       
    <nav>
      <h4>PodSearcher</h4>
      <Link to="/upload">Upload Clip</Link>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      
      {props.currentUser ? `logged in as ${props.currentUser.email}` : null}
      <p onClick={props.logout}>logout</p>
    </nav>
  );
};

export default NavBar;
