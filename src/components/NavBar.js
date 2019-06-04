import React, { Fragment } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import { Menu, Icon, Button } from "semantic-ui-react";

const NavBar = props => {
  const showCurrentUserLinks = () => {
    return (
      <Fragment>
        {/* <NavLink
          className="item"
          activeClassName="active"
          to={`/users/${props.currentUser.id}`}
        >
          My Clips
        </NavLink> */}

        <Link className="item right" to={`/users/${props.currentUser.id}`}>
          <Icon name="user" />
          {props.currentUser.attributes.user_name}
        </Link>
        <a className="item right" onClick={props.logout}>
          <Icon name="log out" />
          Log Out
        </a>
      </Fragment>
    );
  };

  return (
    <Menu >
      <NavLink
        style={{
          color: "#EDA43A"
        }}
        to="/"
      >
        <h1>transcribr.</h1>
      </NavLink>

      {/* <NavLink className="item" activeClassName="active" to="/feed">
        FEED
      </NavLink> */}
      <NavLink className="item" activeClassName="active" to="/newclip">
        <Icon name="add" />
        New Clip
      </NavLink>
      <NavLink className="item" activeClassName="active" to="/clips/64">
        Demo
      </NavLink>

      <Menu.Menu position="right">
        {props.currentUser === null ? (
          <NavLink className="item" activeClassName="active" to="/login">
            <Icon name="sign in" />
            Sign In
          </NavLink>
        ) : (
          showCurrentUserLinks()
        )}
      </Menu.Menu>

      {/* {props.currentUser ? showCurrentUserLinks() : null} */}
      {/* <p onClick={props.logout}>logout</p> */}
    </Menu>
  );
};

export default NavBar;
