import React, { Component, Fragment } from "react";
import ReactAudioPlayer from "react-audio-player";
import Words from "./Words";

import ReactPlayer from 'react-player'

import API_URL from "../components/config"

import { BeatLoader, PacmanLoader } from 'react-spinners';

import { withRouter } from "react-router-dom";


class Clip extends Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.video = React.createRef();
    this.state = {
        clip: null,
        processing: false
    }
  }

  setPlayerPosition = e => {
    if (this.state.clip.media_type === "audio"){
      this.audio.current.audioEl.currentTime = e.start_time
    }
    if (this.state.clip.media_type === "video"){
      // this.audio.current.audioEl.currentTime = e.start_time
      console.log('adjusting video postion')
      // console.log(this.video.current.seekTo)

      this.video.current.seekTo(e.start_time, "seconds")
    }
    
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

  // conditionaly renders save or saved button if the clip exists in curret User Clips
  showButtonIfSaved =  () => {
    let currentUserClips = this.props.currentUser.clips 

    for( let clip of currentUserClips){
      if (clip.id === this.state.clip.id){
        return (
          <button className="clip-show-save-button" disabled> saved </button>
        )
      }
    } // end of for of loop

    return ( 
      <button className="clip-show-save-button" onClick={this.saveClip}> save </button>
    )
  } // end of showButtonIfSaved

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


  renderWords = () => {
    if (this.state.clip.words) {
      return (
        <Words
          setPlayerPosition={this.setPlayerPosition}
          words={this.state.clip.words}
        />
      );
    }
    // shows process audio button if the clip isn't processing and there are no words
    if (this.state.processing === false){
      return <button className="process-audio-button" onClick={this.processAudio}> process audio </button>
    };
  }; // end of render words


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
  } // end of processAudio


    // started working on default image if none uploaded by user
  showImage = () =>{
    if (this.state.clip.gcloud_image_link === ""){
      return ( 
        <div className = "clip-show-image-container"
        style = {{ backgroundImage: `url(https://storage.googleapis.com/bucket-of-doom/audioClipIcon.png)`}} 
        >
        </div>
      )
    }else{
      return (
        <div className="clip-show-image-container"
        style={{backgroundImage: `url(${this.state.clip.gcloud_image_link})`}}
        >
        </div>
      )
    }
  } // end of showImage

  showVideoClip = () => {
     return (
      <div className="clip-show-video">
  
       <ReactPlayer
          className="media-player"
          ref={this.video}
          url={this.state.clip.gcloud_media_link}
          width = '100%'
          height = '100%'
          playing
          controls
           />

        <div className="clip-show-info">
          <h1>{this.state.clip.name}</h1>
          { this.props.currentUser === null ? null
          : this.showButtonIfSaved()
          }
        </div>
       
        {this.renderWords()}

        {this.state.processing === true ? 
          <div className = "pacman-loader">
          <PacmanLoader/> 
          <div className="clip-processing-message">
            <p>Transcribing clip. We'll email you when its done!</p>
          </div>

          </div>
        : null}

      </div>
       
    ); //end of return
  }

  showAudioClip = () => {
    return (
      <div className="clip-show">
        {this.showImage()}
    
        <div className="clip-show-info">
          <h1>{this.state.clip.name}</h1>
          { this.props.currentUser === null ? null
          : this.showButtonIfSaved()
          }
        </div>

        <ReactAudioPlayer
          preload="auto"
          className="media-player"
          ref={this.audio}
          src={this.state.clip.gcloud_media_link}
          controls
        />
        {this.renderWords()}

        {this.state.processing === true ? 
          <div className = "pacman-loader">
            <PacmanLoader/> 
            <div className="clip-processing-message">
              <p>Transcribing clip. We'll email you when its done!</p>
            </div>

          </div>
        : null}

      </div>
    ) // end of return
  } // end of showAudioClip


  showVideoOrAudioClip = () => {
    if (this.state.clip.media_type === "audio"){
      return this.showAudioClip()
    }
    if (this.state.clip.media_type === "video"){
      return this.showVideoClip()
    }
    return (
      <div className="clip-show">
        {this.showImage()}
    
        <div className="clip-show-info">
          <h1>{this.state.clip.name}</h1>
          { this.props.currentUser === null ? null
          : this.showButtonIfSaved()
          }
        </div>

        {this.state.clip.media_type === "audio" ? 
         <ReactAudioPlayer
          preload="auto"
          className="audio-player"
          ref={this.audio}
          src={this.state.clip.gcloud_media_link}
          controls
        />
        : null }

        {this.state.clip.media_type === "video" ?
        <ReactPlayer
          ref={this.video}
          url={this.state.clip.gcloud_media_link}
          width = '100%'
          height = '100%'
          playing
          controls
           />
        : null
         }
        

      
           
       
        {this.renderWords()}

        {this.state.processing === true ? 
          <div className = "pacman-loader">
          <PacmanLoader/> 
          <div className="clip-processing-message">
            <p>Transcribing clip. We'll email you when its done!</p>
          </div>

          </div>
        : null}

      </div>
       
    ); //end of return
  }; // end of showClip

  render(){

    return(

        <div className="player-container"  >
        {this.state.clip === null ? 
          <BeatLoader
            sizeUnit={"rem"}
            size={1}
            loading={true}
          />
        : this.showVideoOrAudioClip()  }
        </div>
    );
  } // end of render
} // end of Clip class

export default withRouter(Clip);