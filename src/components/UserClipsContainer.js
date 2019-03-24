import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { DebounceInput } from 'react-debounce-input';

const uuidv1 = require("uuid/v1");

class UserClipsContainer extends Component {

  constructor(props){
    super(props)
    this.state= {
      clips: [],
      filteredClips: []
    }
  }

  componentDidMount= () => {
    this.getUsersClips()
  }
  

  getUsersClips = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.id}`)
      .then(r => r.json())
      .then(r => this.setState({
        clips: r.clips,
        filteredClips: r.clips
      }));
  };

 

   unSaveClip = (clip) => {
        this.deleteClipFromDom(clip.id)
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

    deleteClipFromDom= (clipId) => {
      let clips = [...this.state.filteredClips]
      let newClips =  clips.filter(c => c.id != clipId)
      console.log(newClips)
      this.setState({filteredClips: newClips, clips: newClips})
    }

    searchInputHandler = (e) => {
      let query = e.target.value
      let results = [...this.state.clips].filter(c => c.name.includes(query))
      this.setState({filteredClips: results})
    }

   deleteClip = (clip) => {
        this.deleteClipFromDom(clip.id)
        console.log("deleting clip")
        let token = localStorage.getItem("token")

        fetch(`http://localhost:3000/api/v1/clips/${clip.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token,
                },
            })

        



    }

      render(){
        console.log(this.state)
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
            onChange={this.searchInputHandler}

          />
          </div>
          <div className="clips-grid">
            {this.state.filteredClips.map(c => (
              <div key={uuidv1()} className="clip-card">
                
                <img className="clip-image" src={c.gcloud_image_link}/>

                
                  <Link className = "clip-card-title" key = {uuidv1()} to = {`/clips/${c.id}`} > {c.name}</Link> 

                  {c.author ? <small> Uploaded By: {c.author.email} </small> : null }
                  {c.author_id === this.props.currentUser.id ? 
                    < button className = "button clip-card-button" onClick = { () => this.deleteClip(c)} > Delete </button>
                    :
                    < button className = "button clip-card-button" onClick = {() => this.unSaveClip(c)} > Remove </button>
                    }
              </div>
                        ))}
          </div>
        </div>
              );
              }

  
}; // end of class


export default UserClipsContainer;
