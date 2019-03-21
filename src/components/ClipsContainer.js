import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const uuidv1 = require("uuid/v1");

const ClipsContainer = props => {

  return (
    <div className="clips-container">
      <h1>Clips Index</h1>
      <div className="search-container">
        <input placeholder="search clips..." onChange={props.filterClips} />
      </div>
      <div className="clips-grid">
        {props.clips.map(c => (
          <div key={uuidv1()} className="clip-card">
            
            <img className="clip-image" src={c.gcloud_image_link}/>

            
              <Link 
              className = "clip-card-title"
              key = {uuidv1()}
              to = {`clips/${c.id}`} > {c.name} 
              </Link> 
              <small> Uploaded By: {c.author.email} </small>
              
              
           
            {/* {c.author ? <p> Uploaded By : {c.author.email} </p> : null} */}
            <button className="button" onClick={() => props.saveClip(c)}> Save </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipsContainer;
