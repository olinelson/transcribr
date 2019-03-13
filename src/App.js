import React, { Component } from 'react';
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
    fetch("http://localhost:3000/api/v1/episodes")
    .then( r => r.json())
   
    .then(r => this.setState({episodes: r}))
    
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


   Home = () => {
  return (
    <div className="home-container">
      <h2>Home</h2>
      {this.state.episodes.length > 0 ? 
        <Player episode={this.state.episodes[0]} />
        : "loading"
      }
      
    </div>
  )
}


}

export default App;
