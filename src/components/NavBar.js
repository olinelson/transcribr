import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavBar = props => {

    const showCurrentUserLinks = () => {
        return (
            <Fragment>
             <p>{`logged in as ${props.currentUser.email}` }</p>
             <p onClick = {props.logout}> logout </p>
             <Link to={`/users/${props.currentUser.id}`}>My Clips</Link>
             </Fragment >
        )
        
    }
   
  return (
       
    <nav>
      <h4>PodSearcher</h4>
      <Link to="/upload">Upload Clip</Link>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      

      
      {props.currentUser ? showCurrentUserLinks() : null}
      {/* <p onClick={props.logout}>logout</p> */}
    </nav>
  );
};

export default NavBar;
