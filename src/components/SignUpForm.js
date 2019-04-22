import React, { Component } from "react";

// api URL
import API_URL from "../config"

import {
    withRouter
} from "react-router-dom";

class SignUpForm extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    password_confirm: "",
    password_error: true,
    email_error: true
  };

  submitHandler = e => {
    let email = this.state.email
    let password = this.state.password
    let username = this.state.username
    e.preventDefault();

  
    fetch(`${API_URL}/users`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            email: email,
            password: password,
            user_name: username,
        }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((r) => r.json())
    .then((r) => {
        if (r.errors){
            alert(r.errors)
        }else{
          this.props.history.push(`/login`)
        }
    })
    
  }

  passwordCheck = () => {
    if (this.state.password === this.state.password_confirm && this.state.password.length > 3) {
      this.setState({password_error: false})
    }else if (this.state.password_error === false){
        this.setState({password_error: true})
        }
    
  };

  emailCheck = () => {
      if (this.state.email.length > 3){
          this.setState({email_error: false})   
      }
      else {
          this.setState({ email_error: true })  
      }
  }


  render() {
   
    return (
      <div className="login-container">

     <h1>Sign Up</h1>
      <form className="sign-up-form" onSubmit={this.submitHandler}>
        <label>Username</label>
        <input
          name="username"
          type="username"
          value = {this.state.username}
          placeholder = {"OlafThePowerful"}
          onChange = { e => this.setState({ username: e.target.value})}
        />
        
        
        <label>Email</label>
        <input
          name="email"
          value={this.state.email}
          placeholder="olaf@olafson.com"
          onChange={e => this.setState({ email: e.target.value }, () => this.emailCheck())}
          type="email"
        />
        
        <label>Password</label>
        <input
          name="password"
          placeholder = "superSecretPassword"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value }, () => this.passwordCheck())}
          type="password"
        />
        <label>Confirm Password</label>
        <input
          name="password_confirm"
          placeholder = "superSecretPassword"
          value={this.state.password_confirm}
          onChange={e => this.setState({ password_confirm: e.target.value }, () => this.passwordCheck())}
          type="password"
        />
        <button className="create-account-button" disabled={this.state.password_error}> Create Account </button>
      </form>
       </div>
    );
  }
}

export default withRouter(SignUpForm);

// hello


