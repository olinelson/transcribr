import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const uuidv1 = require('uuid/v1');

 class ClipsContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            clips: props.clips,
            filteredClips: props.clips
        }
    }

  render(){
      console.log(this.state)
    return (
        <div className="clips-container">
          <h4>Clips Index</h4>
        {
          this.state.filteredClips.map(c =>
              <Link key={uuidv1()} to={`clips/${c.id}`}>{c.name}</Link>
          )
      }
        </div>
      
    )
  }
}

export default ClipsContainer
