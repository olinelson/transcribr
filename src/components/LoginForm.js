import React, { Component } from 'react'

import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

// api URL
import API_URL from "../config"

 class LoginForm extends Component {

    state = {
        email: "",
        password: ""
    }

    submitHandler = (e) => {
        e.preventDefault()

        let email = this.state.email
        let password = this.state.password

        fetch(`${API_URL}/login`, {
            method: 'POST', 
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((r) => r.json())
        .then(r => {

            if (r.errors){
               return alert(r.errors)
            }else{
                
                this.props.setCurrentUser(r)
                this.props.getCurrentUser()
                return r
                }
            
        })
        .then( r => this.props.history.push(`/feed`))

        
    }


    

    render(){
       
        return (
    <div className="login-container">
        <h1>Login</h1>
      <form className="login-form" onSubmit={this.submitHandler}>

          <input 
            className="email-input"
            type="email" 
            placeholder="olaf@olafson.com" 
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
            >
          </input>



          <input 
            className = "password-input"
            type="password"
            placeholder="your password" 
            value={this.state.password} 
            onChange={(e)=> this.setState({password: e.target.value})}
            >
          </input>
          <button className="login-button"> Login </button>
          {/* <button className="signup-button"> Sign Up </button> */}
          <Link className="signup-button" to="/signup"> Sign Up </Link>

      </form>
    </div>
  )
    }
  
}

export default withRouter(LoginForm)

