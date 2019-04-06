import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { DebounceInput } from 'react-debounce-input';
import { BeatLoader } from "react-spinners";

// api URL
import API_URL from "../components/config"

const uuidv1 = require("uuid/v1");

class UserClipsContainer extends Component {

  state = {
    clips: [],
    filteredClips: [],
    loading: true
  }

  componentDidMount = () => {
    this.getUsersClips()
  }

 

  unSaveClip = (clip) => {
    let token = localStorage.getItem("token")
    let id = clip.id

    fetch(`${API_URL}/user_clips/unsave`, {
      method: "POST",
      body: JSON.stringify({
        clip_id: id,
      }),
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json'
      },
      })
    .then(() => this.props.getCurrentUser())
    .then(() => this.getUsersClips())

  } // end of unSaveClip

  getUsersClips = () => {
    fetch(`${API_URL}/users/${this.props.currentUser.id}`)
      .then(r => r.json())
      .then(r => 
        this.setState({
        clips: r.clips,
        filteredClips: r.clips,
        loading: false
        })
      );
  };



  searchInputHandler = (e) => {
  let query = e.target.value
  let results = this.state.clips.filter(c => c.name.toLowerCase().includes(query))
  this.setState({filteredClips: results})
  }


  unSaveClipHandler = (c) => {
    let clips = this.state.filteredClips
    let result = clips.filter(clip => clip.id !== c.id)

    this.setState({
      clips: result,
      filteredClips: result,
    })

    this.unSaveClip(c)
  } // end of unSaveClipHandler

  deleteClipHandler = (c) => {

    let clips = this.state.filteredClips
    let result = clips.filter(clip => clip.id !== c.id)

    this.setState({
      clips: result,
      filteredClips: result,
    })

    this.deleteClip(c)
  }

  deleteClip = (clip) => {
    let token = localStorage.getItem("token")

    fetch(`${API_URL}/clips/${clip.id}`, {
      method: "DELETE",
      headers: {
          "Authorization": token,
      },
    })
  } // end of deleteClip

  render(){

    return(
      <div className="clips-container">

        <div className="search-container">
          <DebounceInput
            label="search clips"
            placeholder="search clips..."
            minLength = { 2 }
            debounceTimeout = { 200 }
            onChange={this.searchInputHandler}
        />
        </div> {/* end of search-container div  */}

        <div className="clips-grid">
          {this.state.loading === true ?
          <BeatLoader/>
          : null
        }

        {this.state.filteredClips.map(c => (
          <div key={uuidv1()} className="clip-card">
            <div className="clip-image-container">
              <img alt="clip-thumbnail" className="clip-image" src={c.gcloud_image_link}/>
            </div>
            
            <Link className = "clip-card-title" key = {uuidv1()} to = {`/clips/${c.id}`} > {c.name}</Link> 

            {c.author ? <small> Uploaded By: {c.author.email} </small> : null }

            {c.author_id === this.props.currentUser.id ? 
              <button className = "button clip-card-button" onClick = { (e) => this.deleteClipHandler(c)} > Delete </button>
              :
              <button className = "button clip-card-button" onClick = {() => this.unSaveClipHandler(c)} > Remove </button>
            }
          </div> // end of clip-card div
        ))}

      </div> {/* end of clips-grid div */}
    </div>  // end of clips-container-div
    ); //end of return
  } // end of render
              

}; // end of class


export default UserClipsContainer;
