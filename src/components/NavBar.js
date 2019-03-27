import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = props => {

    const showCurrentUserLinks = () => {
        return (
            <Fragment>
             
             <a onClick = {props.logout}> LOGOUT </a>
             <Link to={`/users/${props.currentUser.id}`}>SAVED CLIPS</Link>
        <a className="logged-in-as"> <FontAwesomeIcon icon = "user" /> {props.currentUser.user_name}</a>
             </Fragment >
        )
        
    }
   
  return (
       
    <nav>
      <h4>transcribr.</h4>
      <div className="nav-links">
      <Link to="/upload">UPLOAD</Link>
      <Link to="/">FEED</Link>

      {props.currentUser === null ? 
      < Link to = "/login" > LOGIN </Link>
      : showCurrentUserLinks()
    }
      
      </div>

      
      {/* {props.currentUser ? showCurrentUserLinks() : null} */}
      {/* <p onClick={props.logout}>logout</p> */}
    </nav>
  );
};

export default NavBar;
