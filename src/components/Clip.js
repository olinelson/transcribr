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
       fetch(`${API_URL}/clips/${this.props.id}`, {
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

    // started working on default image if none uploaded by user
    showImage = () =>{
      if (this.state.clip.gcloud_image_link === ""){
        
        return ( <div className = "clip-show-image-container"
          style = {
            {
              backgroundImage: `url(https://storage.googleapis.com/bucket-of-doom/audioClipIcon.png)`
            }
          } >
          </div>
        )
      }else{
        return (
          <div className="clip-show-image-container"
          style={
            {backgroundImage: `url(${this.state.clip.gcloud_image_link})`}
          }
          >
          </div>
          
        )
      }

      return(
          <div className="clip-show-image-container"
          style={
            {backgroundImage: `url(https://storage.googleapis.com/bucket-of-doom/YKmY2gceXAQgbmAVkm6ruQPr)`}
          }
          >
          </div>
        )


    }




  showClip = () => {
      return (
     
           
        <div className="clip-show">
          {this.showImage()}
        
          
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
          {this.state.processing === true ? 
          < div className = "pacman-loader">
          <PacmanLoader/> 
          <div className="clip-processing-message">
          <p>Transcribing clip. We'll email you when its done!</p>
          </div>
          </div>
          : null}
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


