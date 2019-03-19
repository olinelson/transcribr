import React, { Component } from "react";

import {
    withRouter
} from "react-router-dom";

class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    password_confirm: "",
    password_error: true,
    email_error: true
  };

  submitHandler = e => {
    let email = this.state.email
    let password = this.state.password
    e.preventDefault();

  
    fetch("http://localhost:3000/api/v1/users", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            email: email,
            password: password
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
          this.props.history.push(`users/${r.id}`)
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
      <form onSubmit={this.submitHandler}>
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
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value }, () => this.passwordCheck())}
          type="password"
        />
        <label>Confirm Password</label>
        <input
          name="password_confirm"
          value={this.state.password_confirm}
          onChange={e => this.setState({ password_confirm: e.target.value }, () => this.passwordCheck())}
          type="password"
        />
        <button disabled={this.state.password_error}> Create Account </button>
      </form>
    );
  }
}

export default withRouter(SignUpForm);


