import React, { Component, Fragment } from 'react';
import './App.css';

// react router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import NavBar from './components/NavBar'
import Clip from './components/Clip'
import AddClipForm from './components/AddClipForm'

// uuid
const uuidv1 = require('uuid/v1');


class App extends Component {
  state = {
    
    clips: [],
    

  }

  componentDidMount() {
    this.getAllclips()
    
    
  }

  getAllclips= ()=> {
    fetch("http://localhost:3000/api/v1/clips")
      .then(r => r.json())
      .then(r => this.setState({ clips: r }))
  }


  selectEpisodeToPlay = (id)=> {
    let foundEpisode = this.state.clips.find( e => e.id == id)
    
    this.setState({playingEpisode: foundEpisode})
   
  }





  render() {
    
    return (
      <Router>
        <div>
          <NavBar />

          <Route exact path="/" component={this.Home} />
          <Route exact path="/clips" component={this.ClipsIndex} />
          <Route path="/clips/:id" component={this.ClipShow} />
          
          
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


  ClipsIndex = () => {
    return (
      <Fragment>
        <h4>Clips Index</h4>
        {this.state.clips.map(c => 
        <Link key={uuidv1()} to={`clips/${c.id}`}>{c.name}</Link>
        )} 
        <hr></hr>
        <AddClipForm/>

      </Fragment>
    )
  }



  ClipShow = ({ match }) => {
    let found =  this.state.clips.find(c => c.id == match.params.id)
  return (
      <Fragment>
      <Clip clip={found}/>
      {/* <Podcast createEpisode={this.createEpisode} selectEpisodeToPlay={this.selectEpisodeToPlay} clip={found}/> */}
      </Fragment>
  
  );
}


}

export default App;
