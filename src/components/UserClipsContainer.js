import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const uuidv1 = require("uuid/v1");

const ClipsContainer = props => {

   const unSaveClip = (clip) => {
        console.log("unsaving clip")
        let token = localStorage.getItem("token")
        let id = clip.id
        fetch("http://localhost:3000/api/v1/user_clips/unsave", {
                method: "POST",
                body: JSON.stringify({
                    clip_id: id,
                }),
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
            })

    }

      const deleteClip = (clip) => {
          console.log("deleting clip")
          let token = localStorage.getItem("token")

          fetch(`http://localhost:3000/api/v1/clips/${clip.id}`, {
                  method: "DELETE",
                  headers: {
                      "Authorization": token,
                  },
              })

      }

  return (
    <div className="clips-container">
      <h1>Saved Clips</h1>
      <div className="search-container">
        <input placeholder="search clips..." onChange={props.filterClips} />
      </div>
      <div className="clips-grid">
        {props.user.clips.map(c => (
          <div key={uuidv1()} className="clip-card">
            
            <img className="clip-image" src={c.gcloud_image_link}/>

            
              <Link 
              className = "clip-card-title"
              key = {uuidv1()}
              to = {`clips/${c.id}`} > {c.name} 
              </Link> 
              {c.author ? <small> Uploaded By: {c.author.email} </small> : null }
              {c.author_id === props.user.id ? 
                <button className="button" onClick={() => deleteClip(c)}> Delete </button>
                :
                <button className="button" onClick={() => unSaveClip(c)}> Remove </button>
                }
              
              
              
           
           
            
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default ClipsContainer;
