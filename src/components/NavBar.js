import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = props => {

    const showCurrentUserLinks = () => {
        return (
            <Fragment>
             
             
             <NavLink activeClassName="selected" to={`/users/${props.currentUser.id}`}>SAVED CLIPS</NavLink>
             <a onClick = {props.logout}> LOGOUT </a>
             <Link to={`/users/${props.currentUser.id}`} className="logged-in-as"> <FontAwesomeIcon icon = "user" /> {props.currentUser.user_name}</Link>
             </Fragment >
        )
        
    }
   
  return (
       
    <nav>
      < NavLink to = "/" ><h4>transcribr.</h4></NavLink>

      
      <div className="nav-links">
      <NavLink activeClassName="selected" to="/feed">FEED</NavLink>
      <NavLink activeClassName="selected" to="/upload">UPLOAD</NavLink>
      

      {props.currentUser === null ? 
      < NavLink activeClassName="selected" to = "/login" > LOGIN </NavLink>
      : showCurrentUserLinks()
    }
      
      </div>

      
      {/* {props.currentUser ? showCurrentUserLinks() : null} */}
      {/* <p onClick={props.logout}>logout</p> */}
    </nav>
  );
};

export default NavBar;
