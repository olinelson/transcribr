import React, { Component, Fragment } from "react";
import ReactAudioPlayer from "react-audio-player";
import Words from "./Words";

// api URL
import API_URL from "./config"

import { BeatLoader, PacmanLoader } from 'react-spinners';

import {
    withRouter
} from "react-router-dom";



class Clip extends Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.state = {
        clip: null,
        processing: false
    }
  }

  setPlayerPosition = e => {
    this.audio.current.audioEl.currentTime = e.start_time;
  };

  componentDidMount = () => {
    this.getClip() 
    
  }

  isClipProcessing= (clip) => {
     if (clip.processing === true) {
       this.setState({
         clip: clip,
         processing: true
       })
     } else{
       this.setState({
           clip: clip,
           processing: false
         })
       }
  }

    getClip = () => {
       fetch(`${API_URL}/${this.props.id}`, {
        method: "GET",
      })
      .then(r => r.json())
      .then(r => this.isClipProcessing(r) )
     
    }

    showButtonIfSaved =  () =>{
      let currentUserClips = this.props.currentUser.clips 
      for( let clip of currentUserClips){
        console.log("in the loop", clip.id)
      if (clip.id === this.state.clip.id){
        
        return (
          <button className="clip-show-save-button" disabled> saved </button>
        )

      }
    }
    return ( 
      <button className="clip-show-save-button" onClick={this.saveClip}> save </button>
    )
    }

  saveClip = () => {
      
      let token = localStorage.getItem("token")
      let id = this.state.clip.id
      fetch(`${API_URL}/user_clips`, {
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


  }

  // 


  renderWords = () => {
    if (this.state.clip.words) {
      return (
        <Words
          
          setPlayerPosition={this.setPlayerPosition}
          words={this.state.clip.words}
        />
      );
    }
    
      if (this.state.processing === false){
        return <button className="process-audio-button" onClick={this.processAudio}> process audio </button>
      }
      
;
    
  };

  processAudio = () => {
      this.setState({processing: true})
      let token = localStorage.getItem("token")
      let id = this.state.clip.id
      fetch(`${API_URL}/audio_process`, {
          method: "POST",
          body: JSON.stringify({
              clip_id: id,
          }),
          headers: {
              "Authorization": token,
              'Content-Type': 'application/json'
          },
      })
      .then(() => this.getClip())

  }




  showClip = () => {
      return (
     
           
        <div className="clip-show">
          <div className="clip-show-image-container">
          <img className="clip-show-image" alt={this.state.clip.name} src={this.state.clip.gcloud_image_link}/>
          </div>
          
          <div className="clip-show-info">
            <h1>{this.state.clip.name}</h1>
            {
            this.props.currentUser === null ? 
            null
            : this.showButtonIfSaved()
          }
          </div>
          
          
          <ReactAudioPlayer
            // autoPlay
            preload="auto"
            className="audio-player"
            ref={this.audio}
            src={this.state.clip.gcloud_media_link}
            controls
          />

          
          
           

          {this.renderWords()}
          {this.state.processing === true ? <PacmanLoader className="pacman-loader"/> : null}
        </div>
       
      );
        
    
  };

  render(){


    return(


      <Fragment>
        <div className="player-container"  >

        {this.state.clip === null ? 
            <BeatLoader
            sizeUnit={"rem"}
            size={1}
            // color={'#123abc'}
            loading={true}
        />
            
            : this.showClip()  }
        </div>

      </Fragment>
    );
  }
}

export default withRouter(Clip);


