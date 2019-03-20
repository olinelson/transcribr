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


class App extends Component {
  state = {
    clips: [],
    filteredClips: [],
    selectedClip: [],
    currentUser: null
  };

  componentDidMount() {
    this.getAllclips();
    let token = localStorage.getItem("token")
    if (token){
      console.log("doing fetch")
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
    // console.log(response)
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

  getAllclips = () => {
    fetch("http://localhost:3000/api/v1/clips")
      .then(r => r.json())
      .then(r => this.setState({ clips: r, filteredClips: r }));
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

    return (
        <Fragment>
          <NavBar logout={this.logout} currentUser={this.state.currentUser} />
          <div className="site-container">
            <Route exact path="/" component={this.Home} />
            <Route exact path="/clips" component={this.ClipsIndex} />
            <Route path="/clips/:id" component={this.ClipShow} />
            <Route path="/upload" component={this.Upload} />
            <Route path="/signup" component={this.SignUp} />
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

  Upload = () => {
    return (
      <Fragment>
        <AddClipForm />
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
