import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const uuidv1 = require("uuid/v1");

const ClipsContainer = props => {
  console.log("clips container", props)
  return (
    <div className="clips-container">
      <h1>Clips Index</h1>
      <div className="search-container">
        <input placeholder="search clips..." onChange={props.filterClips} />
      </div>
      <div className="clips-grid">
        {props.clips.map(c => (
          <div key={uuidv1()} className="clip-card">
            <Link key={uuidv1()} to={`clips/${c.id}`}>
              {c.name}
            </Link>
            <a onClick={() => props.saveClip(c)}> Save Clip </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipsContainer;
