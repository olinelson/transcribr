import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom"

import { DebounceInput } from 'react-debounce-input';

import { BeatLoader } from 'react-spinners';

const uuidv1 = require("uuid/v1");

class ClipsContainer extends Component {

    state = { 
      clips: [],
      filteredClips: [],
      loading: true
    }

    searchInputHandler = e => {
       let input = e.target.value;
       let result = [...this.state.clips].filter(c => c.name.toLowerCase().includes(input));
       this.setState({
         filteredClips: result,
         loading: false
        })
     };

     componentDidMount= () => {
      this.getAllClips()
     }

      getAllClips = () => {

        fetch("http://localhost:3000/api/v1/clips", {
            method: "GET"
          })
          .then(r => r.json())
          .then(r => this.setState({
            clips: r,
            filteredClips: r,
            loading: false,

          }))



      }

      showClips = () => {

        if (this.state.filteredClips){
          if (this.state.filteredClips.length === 0 && this.state.loading === false){
            return "no search results"
          }


          return (
          this.state.filteredClips.map(c => (

          <div key={uuidv1()} className="clip-card">
            <div className="clip-image-container">
            <img className="clip-image" src={c.gcloud_image_link}/>
            </div>

           
              <Link 
                className = "clip-card-title"
                key = {uuidv1()}
                to = {`clips/${c.id}`} > {c.name} 
              </Link> 
              <small className="author-tag">{c.author.user_name} </small>
            
          
          </div>
        ))
          )
        }
      }

     

      


render(){


return (

    <div className="clips-container">

      {/* <h1>Clips Index</h1> */}
      <div className="search-container">

        <DebounceInput
            label="search clips"
            placeholder="search for clips..."
            minLength = { 2 }
            debounceTimeout = { 300 }
            onChange={this.searchInputHandler}
        


          />
      </div>
      <div className="clips-grid">
        {this.state.loading === true ?

        <BeatLoader/>
        
        : null
      }
        {this.showClips()}
        
      </div>
    </div>
  );
        }

  
};

export default ClipsContainer;

