import React, { Component, Fragment } from "react";
import "./App.css";

// react router
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

// components
import NavBar from "./components/NavBar";
import Clip from "./components/Clip";
import AddClipForm from "./components/AddClipForm";
import ClipsContainer from "./components/ClipsContainer";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm"
import User from "./components/User"


// filtered clips and clips used for results in clips container
class App extends Component {
  state = {
    clips: [],
    filteredClips: [],
    currentUser: null,
  };

  componentDidMount() {
    this.getCurrentUser()
    this.getAllClips()
  }

  // auto login method that sets current user if one has already logged in
  getCurrentUser(){
    let token = localStorage.getItem("token")
    if (token) {

      fetch("http://localhost:3000/api/v1/auto_login", {
          method: "GET",
          headers: {
            "Authorization": token
          }
        })
        .then(r => r.json())
        .then(r => this.setState({
          currentUser: r,
        }))

    }
  }

  // gests all clips and adds them to state for use in clips container...
  getAllClips(){
    console.log('getting allclips')
    fetch("http://localhost:3000/api/v1/clips", {
      method: "GET"
    })
    .then( r => r.json())
    .then(r => this.setState({
      clips: r,
      filteredClips: r
    }))
  }


  // for use with the login form component
  setCurrentUser = (response) => {
    console.log("setting current user")
  
    this.setState({
      currentUser: response.user,
   
    })
    localStorage.setItem("token", response.jwt)


  }


  logout = () => {
    localStorage.removeItem("token")
    this.setState({currentUser: null})
    this.props.history.push("/")
  }

  // this gets called by clips container to filter the clips shown as a result of the search bar
   filterClips = (result) => {
     this.setState({
       filteredClips: result
     })
   }



  render() {

    console.log("in app", this.state)
    return (
        <Fragment >
          <NavBar logout={this.logout} currentUser={this.state.currentUser} />
          <div className="site-container" >
            <Route exact path="/" component={this.Home} />
            <Route exact path="/clips" component={this.ClipsIndex} />
            <Route path="/clips/:id" component={this.ClipShow} />
            <Route path="/upload" component={this.Upload} />
            <Route path="/signup" component={this.SignUp} />
            <Route path="/users/:id" component={this.UserShow}/>
            <Route path="/login" render={(routerProps) => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser}/> } />


          </div>
        </Fragment>
      
    );
  }

 



  Home = () => {
    return (
      <Fragment>
        <ClipsContainer
          filterClips={this.filterClips}

          filteredClips={this.state.filteredClips}
          clips={this.state.clips}
        />

        {/* <AddClipForm /> */}
      </Fragment>
    );
  }; //end of Home



  ClipShow = ({ match }) => {
    // id used to find clip in clip component with its own fetch request
    let id = match.params.id
    return (
        <Clip currentUser={this.state.currentUser}  id={id}/>
    );
  };

  UserShow = ({match}) => {
    return (
      <User getCurrentUser={this.getCurrentUser}  currentUser={this.state.currentUser} />
    );
  };

  Upload = () => {
    return (
      <Fragment>
        <AddClipForm  getCurrentUser={this.getCurrentUser} getAllClips={this.getAllClips} currentUser={this.state.currentUser} />
      </Fragment>
    );
  };

  SignUp = () => {
    return (
      <Fragment>
        <SignUpForm />
      </Fragment>
    );
  };




}




export default withRouter(App);
