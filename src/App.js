import React, { Component, Fragment } from 'react';
import './App.css';

// react router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import NavBar from './components/NavBar'
import Clip from './components/Clip'
import AddClipForm from './components/AddClipForm'
import ClipsContainer from './components/ClipsContainer'

// uuid
const uuidv1 = require('uuid/v1');


class App extends Component {
  state = {
    
    clips: [],
    selectedClip: []
    

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
    console.log("app",this.state)
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
    

      <Fragment>
      <ClipsContainer clips={this.state.clips} />
      <AddClipForm />
      
      </Fragment>
      
    
  )
} //end of Home


  ClipsIndex = () => {
    return (
      <Fragment>
        <ClipsContainer clips={this.state.clips}/>
        <AddClipForm/>

      </Fragment>
    )
  }



  ClipShow = ({ match }) => {
    let found =  this.state.clips.find(c => c.id == match.params.id)
  return (
      <Fragment>
      <Clip clip={found}/>
      <ClipsContainer clips={this.state.clips} />
      </Fragment>
  
  );
}


}

export default App;
