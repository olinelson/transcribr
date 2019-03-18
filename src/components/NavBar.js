import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavBar = props => {
  return (
    <nav>
      <h4>PodSearcher</h4>
      <Link to="/upload">Upload Clip</Link>
      <Link to="/">Sign Up</Link>
      <Link to="/">Sign In</Link>
    </nav>
  );
};

export default NavBar;
