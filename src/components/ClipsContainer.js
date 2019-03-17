import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const uuidv1 = require('uuid/v1');



 const ClipsContainer = (props) => {

   const filteredClips = (e) => {
     let clips = [...props.clips]
     console.log("filtered clips", e.target.value)
    //  let filteredClips = clips.filter(f =)
   }
   
      
    return (
        <div className="clips-container">
        
          <h4>Clips Index</h4>
        <div className="search-container">
          <h4>Search:</h4>
          <input onChange={filteredClips}></input>
        </div>
        {
          props.clips.map(c =>
              <Link key={uuidv1()} to={`clips/${c.id}`}>{c.name}</Link>
          )
      }
        </div>
      
    )
  }


export default ClipsContainer
