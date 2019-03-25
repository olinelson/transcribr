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

  getAllClips(){
    fetch("http://localhost:3000/api/v1/clips", {
      method: "GET"
    })
    .then( r => r.json())
    .then(r => this.setState({
      clips: r
    }))
  }



  setCurrentUser = (response) => {
  
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

  // updateLocalClip = (clip) => {
  //   let newUserClips = [...this.state.currentUserClips, clip]

  //   this.setState({currentUserClips: newUserClips})
  // }

  // saveClip = (clip) => {
  //   this.updateLocalClip(clip)
  //   let token = localStorage.getItem("token")
  //   let id = clip.id
  //   fetch("http://localhost:3000/api/v1/user_clips", {
  //     method: "POST",
  //     body: JSON.stringify({
  //        clip_id: id,
  //      }),
  //      headers: {
  //        "Authorization": token,
  //        'Content-Type': 'application/json'
  //      },
  //   })
  //   // .then(() => this.getAllClips)
  // }


  selectEpisodeToPlay = id => {
    let foundEpisode = this.state.clips.find(e => e.id == id);

    this.setState({ playingEpisode: foundEpisode });
  };

  filterClips = e => {
    let input = e.target.value;
    let result = [...this.state.clips].filter(c => c.name.includes(input));

    this.setState({ filteredClips: result });
  };

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
          updateLocalClip={this.updateLocalClip}
          //  currentUser = {
          //    this.state.currentUser
          //  }
           currentUserClips={this.state.currentUserClips}
           saveClip={this.saveClip}
          // filterClips={this.filterClips}
          clips={this.state.clips}
        />

        {/* <AddClipForm /> */}
      </Fragment>
    );
  }; //end of Home



  ClipShow = ({ match }) => {
    // let found = this.state.clips.find(c => c.id == match.params.id);
    let id = match.params.id
    return (
     
        <Clip currentUser={this.state.currentUser}  id={id}/>
     
    );
  };

  UserShow = ({match}) => {


    return (
      <User  currentUser={this.state.currentUser} />
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
