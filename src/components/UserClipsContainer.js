import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { DebounceInput } from 'react-debounce-input';

const uuidv1 = require("uuid/v1");

const UserClipsContainer = (props) => {

 

   const unSaveClip = (clip) => {
        // this.deleteClipFromDom(clip.id)
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
            }).then(() => props.getUsersClips())

    }



    const searchInputHandler = (e) => {
      let query = e.target.value
      let results = props.usersClips.filter(c => c.name.includes(query))
      // this.setState({filteredClips: results})
      props.setFilteredUsersClips(results)
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
            .then(() => props.getUsersClips())
            .then(() => props.getAllClips())
           

        



    }

     
        console.log("in user clips", props)
        return(
        <div className="clips-container">
          <h1>Saved Clips</h1>
          <div className="search-container">
            {/* <input placeholder="search clips..." onChange={this.searchInputHandler} /> */}
            <DebounceInput
            label="search clips"
            placeholder="search clips..."
            minLength = { 2 }
            debounceTimeout = { 200 }
            onChange={searchInputHandler}

          />
          </div>
          <div className="clips-grid">
            {props.usersFilteredClips.map(c => (
              <div key={uuidv1()} className="clip-card">
                
                <img className="clip-image" src={c.gcloud_image_link}/>

                
                  <Link className = "clip-card-title" key = {uuidv1()} to = {`/clips/${c.id}`} > {c.name}</Link> 

                  {c.author ? <small> Uploaded By: {c.author.email} </small> : null }
                  {c.author_id === props.currentUser.id ? 
                    < button className = "button clip-card-button" onClick = { () => deleteClip(c)} > Delete </button>
                    :
                    < button className = "button clip-card-button" onClick = {() => unSaveClip(c)} > Remove </button>
                    }
              </div>
                        ))}
          </div>
        </div>
              );
              

  
}; // end of class


export default UserClipsContainer;
