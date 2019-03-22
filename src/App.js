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
    users: [],
    filteredClips: [],
    selectedClip: [],
    currentUser: null
  };

  componentDidMount() {
    this.getAllClips();
    this.getAllUsers();
    let token = localStorage.getItem("token")
    if (token){
      
      fetch("http://localhost:3000/api/v1/auto_login", {
        method: "GET",
        headers: {
          "Authorization": token
        }
      })
      .then(r => r.json())
      .then(r => this.setState({currentUser: r}))
      
    }
  }

  setCurrentUser = (response) => {
  
    this.setState({
      currentUser: response.user
    })
    localStorage.setItem("token", response.jwt)
  }

  logout = () => {
    localStorage.removeItem("token")
    this.setState({currentUser: null})
    this.props.history.push("/")
  }

  saveClip = (clip) => {
    let token = localStorage.getItem("token")
    let id = clip.id
    fetch("http://localhost:3000/api/v1/user_clips", {
      method: "POST",
      body: JSON.stringify({
         clip_id: id,
       }),
       headers: {
         "Authorization": token,
         'Content-Type': 'application/json'
       },
    })
    .then(() => this.getAllClips)
  }

  unSaveClip = (clip) => {
    console.log("unsaving clip")
    let token = localStorage.getItem("token")
    let id = clip.id
    fetch("http://localhost:3000/api/v1/user_clips/unsave", {
        method: "POST",
        body: JSON.stringify({
          clip_id: id,
        }),
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        },
      })
      .then(() => this.getAllClips)
  }

  getAllClips = () => {
    fetch("http://localhost:3000/api/v1/clips")
      .then(r => r.json())
      .then(r => this.setState({ clips: r, filteredClips: r }));
  };

   getAllUsers = () => {
     fetch("http://localhost:3000/api/v1/users")
       .then(r => r.json())
       .then(r => this.setState({
         users: r
       }));
   };

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

    console.log(this.state.currentUser)
    return (
        <Fragment>
          <NavBar logout={this.logout} currentUser={this.state.currentUser} />
          <div className="site-container">
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
          clips={this.state.filteredClips}
          saveClip = {
            this.saveClip
          }
        />

        {/* <AddClipForm /> */}
      </Fragment>
    );
  }; //end of Home

  ClipsIndex = () => {
    return (
      <Fragment>
        <ClipsContainer
          
          filterClips={this.filterClips}
          clips={this.state.filteredClips}
        />
        <AddClipForm />
      </Fragment>
    );
  };

  ClipShow = ({ match }) => {
    let found = this.state.clips.find(c => c.id == match.params.id);
    return (
     
        <Clip clip={found} />
     
    );
  };

  UserShow = ({match}) => {


    return (
      <User unSaveClip={this.unSaveClip} user={this.state.currentUser} users={this.state.users}/>
    );
  };

  Upload = () => {
    return (
      <Fragment>
        <AddClipForm getAllClips={this.getAllClips} currentUser={this.state.currentUser} />
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

  //  Login = () => {
  //    return ( <LoginForm / >
       
  //    );
  //  };



}




export default withRouter(App);
