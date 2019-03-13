import React, { Component } from 'react';
import './App.css';

// react router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import NavBar from './components/NavBar'
import Player from './components/Player'
import Podcast from './components/Podcast'

class App extends Component {
  state = {
    podcasts: [],
    episodes: [],

  }

  componentDidMount() {
    this.getAllEpisodes()
    this.getAllPodcasts()
    
  }

  getAllEpisodes(){
    fetch("http://localhost:3000/api/v1/episodes")
      .then(r => r.json())
      .then(r => this.setState({ episodes: r }))
  }

  getAllPodcasts() {
    fetch("http://localhost:3000/api/v1/podcasts")
      .then(r => r.json())
      .then(r => this.setState({ podcasts: r }))
  }





  render() {
    
    return (
      <Router>
        <div>
          <NavBar />

          <Route exact path="/" component={this.Home} />
          <Route path="/:id" component={this.PodcastShow} />
          
        </div>
      </Router>
    );
  }


   Home = () => {
  return (
    <div className="home-container">

      {/* this should contain index of all podcasts and upload button */}

      {/* <h2>Home</h2>
      {this.state.episodes.length > 0 ? 
        <Player episode={this.state.episodes[0]} />
        : "loading"
      } */}
      
    </div>
  )
} //end of Home

  PodcastShow = ({ match }) => {
    let found =  this.state.podcasts.find(p => p.id == match.params.id)
  return (
    
      <Podcast podcast={found}/>
  
  );
}


}

export default App;
