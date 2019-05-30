import React, { Fragment } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import { Menu } from "semantic-ui-react";

const NavBar = props => {
  const showCurrentUserLinks = () => {
    return (
      <Fragment>
        <NavLink
          className="item"
          activeClassName="active"
          to={`/users/${props.currentUser.id}`}
        >
          SAVED CLIPS
        </NavLink>
        <a className="item" onClick={props.logout}>
          {" "}
          LOGOUT{" "}
        </a>

        <Link
          className="item right"
          to={`/users/${props.currentUser.id}`}

        >
          {props.currentUser.attributes.user_name}
        </Link>
      </Fragment>
    );
  };

  return (
    <Menu>
      <NavLink to="/">
        <h1>transcribr.</h1>
      </NavLink>

      {/* <NavLink className="item" activeClassName="active" to="/feed">
        FEED
      </NavLink> */}
      <NavLink className="item" activeClassName="active" to="/newclip">
        NEW CLIP
      </NavLink>

      {props.currentUser === null ? (
        <NavLink className="item" activeClassName="active" to="/login">
          LOGIN
        </NavLink>
      ) : (
        showCurrentUserLinks()
      )}

      {/* {props.currentUser ? showCurrentUserLinks() : null} */}
      {/* <p onClick={props.logout}>logout</p> */}
    </Menu>
  );
};

export default NavBar;
