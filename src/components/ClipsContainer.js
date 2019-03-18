import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const uuidv1 = require("uuid/v1");

const ClipsContainer = props => {
  
  let clips = [...props.clips]
 
  const filterClips = (e) => {
    let input = e.target.value
    let newClips = [...clips]
    let filtered = newClips.filter(c => c.name.includes(input))
    console.log(filtered)
    clips = filtered
  }

  return (
    <div className="clips-container">
    {console.log(props)}
      <h4>Clips Index</h4>
      <div className="search-container">
        <h4>Search:</h4>
        <input onChange={filterClips} />
      </div>
      {props.filteredClips.map(c => (
        <Link key={uuidv1()} to={`clips/${c.id}`}>
          {c.name}
        </Link>
      ))}
    </div>
  );
};

export default ClipsContainer;
