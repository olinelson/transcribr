import React, { Component, Fragment } from 'react';
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
    playingEpisode: null

  }

  componentDidMount() {
    this.getAllEpisodes()
    this.getAllPodcasts()
    
  }

  getAllEpisodes= ()=> {
    fetch("http://localhost:3000/api/v1/episodes")
      .then(r => r.json())
      .then(r => this.setState({ episodes: r }))
  }

  getAllPodcasts= () => {
    fetch("http://localhost:3000/api/v1/podcasts")
      .then(r => r.json())
      .then(r => this.setState({ podcasts: r }))
  }

  selectEpisodeToPlay = (id)=> {
    let foundEpisode = this.state.episodes.find( e => e.id == id)
    
    this.setState({playingEpisode: foundEpisode})
   
  }





  render() {
    
    return (
      <Router>
        <div>
          <NavBar />

          <Route exact path="/" component={this.Home} />
          <Route exact path="/podcasts" component={this.PodcastIndex} />
          <Route path="/podcasts/:id" component={this.PodcastShow} />
          
          
        </div>
      </Router>
    );
  }


   Home = () => {
  return (
    <div className="home-container">

      {/* this should contain index of all podcasts and upload button */}

      <h2>Home</h2>
      
      
    </div>
  )
} //end of Home


  PodcastIndex = () => {
    return (
      <Fragment>
        <h4>Podcast Index</h4>
        {this.state.podcasts.map(p => 
        <Link to={`podcasts/${p.id}`}>{p.name}</Link>
        )} 
      </Fragment>
    )
  }



  PodcastShow = ({ match }) => {
    let found =  this.state.podcasts.find(p => p.id == match.params.id)
  return (
      <Fragment>
      
      <Player episode={this.state.playingEpisode}/>
      <Podcast createEpisode={this.createEpisode} selectEpisodeToPlay={this.selectEpisodeToPlay} podcast={found}/>
      </Fragment>
  
  );
}


}

export default App;
