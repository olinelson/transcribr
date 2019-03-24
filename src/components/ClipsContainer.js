import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom"

import { DebounceInput } from 'react-debounce-input';

const uuidv1 = require("uuid/v1");

class ClipsContainer extends Component {

    state = {
      clips: [],
      filteredClips: []
    }

    componentDidMount = () => {
      this.getAllClips()
    }
  

    getAllClips = () => {
      fetch("http://localhost:3000/api/v1/clips")
        .then(r => r.json())
        .then(r => this.setState({
          clips: r,
          filteredClips: r
        }));
    };

     searchInputHandler = e => {
       let input = e.target.value;
       let result = [...this.state.clips].filter(c => c.name.includes(input));

       this.setState({
         filteredClips: result
       });
     };



render(){
  console.log(this.state.clips)
return (

    <div className="clips-container">

      <h1>Clips Index</h1>
      <div className="search-container">

        <DebounceInput
            label="search clips"
            placeholder="search clips..."
            minLength = { 2 }
            debounceTimeout = { 200 }
            onChange={this.searchInputHandler}

          />
      </div>
      <div className="clips-grid">
        {this.state.filteredClips.map(c => (
          <div key={uuidv1()} className="clip-card">
            
            <img className="clip-image" src={c.gcloud_image_link}/>

           
              <Link 
              className = "clip-card-title"
              key = {uuidv1()}
              to = {`clips/${c.id}`} > {c.name} 
              </Link> 
              <small> Uploaded By: {c.author.email} </small>
              
               {/* {this.saveButton(c)} */}
          
            {/* <button className="button" onClick={() => this.props.saveClip(c)}> Save </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}

  
};

export default ClipsContainer;

// changes
