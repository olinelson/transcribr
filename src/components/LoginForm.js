import React, { Component } from 'react'

import { withRouter } from "react-router-dom";

 class LoginForm extends Component {

    state = {
        email: "",
        password: ""
    }

    submitHandler = (e) => {
        e.preventDefault()

        let email = this.state.email
        let password = this.state.password

        fetch("http://localhost:3000/api/v1/login", {
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
                alert(r.errors)
            }else{
                this.props.history.push(`users/${r.user.id}`)
                this.props.setCurrentUser(r)
                }
            
        })
    }

    render(){
       
        return (
    <div>
      <form onSubmit={this.submitHandler}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="olaf@olafson.com" 
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
            >
          </input>

          < label>Password</label>

          <input 
            type="password"
            placeholder="your password" 
            value={this.state.password} 
            onChange={(e)=> this.setState({password: e.target.value})}
            >
          </input>
          <button> Login </button>
      </form>
    </div>
  )
    }
  
}

export default withRouter(LoginForm)

