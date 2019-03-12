import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// react router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import NavBar from './components/NavBar'
import Player from './components/Player'

class App extends Component {
  state = {
    podcasts: [],
    episodes: [],

  }

  componentDidMount() {
    fetch("")
  }





  render() {
    return (
      <Router>
        <div>
          <NavBar />

          <Route exact path="/" component={this.Home} />
          
        </div>
      </Router>
    );
  }
   Home() {
  return (
    <div className="home-container">
      <h2>Home</h2>
      <Player/>
    </div>
  )
}


}

export default App;
