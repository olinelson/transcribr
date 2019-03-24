import React, { Component, Fragment } from "react";
import ReactAudioPlayer from "react-audio-player";
import Words from "./Words";

import { BeatLoader } from 'react-spinners';

import {
    withRouter
} from "react-router-dom";



class Clip extends Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.state = {
        clip: null,
        
        
    }
  }

  setPlayerPosition = e => {
    this.audio.current.audioEl.currentTime = e.start_time;
  };

  componentDidMount = () => {
     fetch(`http://localhost:3000/api/v1/clips/${this.props.id}`, {
        method: "GET",
      })
      .then(r => r.json())
      
      .then(r => this.setState({clip: r,}))
      
  }

//   saveClip = () => {
      
//       let token = localStorage.getItem("token")
//       let id = this.state.clip.id
//       fetch("http://localhost:3000/api/v1/user_clips", {
//           method: "POST",
//           body: JSON.stringify({
//               clip_id: id,
//           }),
//           headers: {
//               "Authorization": token,
//               'Content-Type': 'application/json'
//           },
//       })
//     //   .then(this.props.history.push(`/users/${this.props.currentUser.id}`))

//   }



  renderWords = () => {
    if (this.state.clip.words) {
      return (
        <Words
          
          setPlayerPosition={this.setPlayerPosition}
          words={this.state.clip.words}
        />
      );
    } else {
      return <p>processing clip...</p>;
    }
  };





  showClip = () => {
      return (
     
           
        <div className="clip-show"  >
        
          <img className="clip-show-image" alt={this.state.clip.name} src={this.state.clip.gcloud_image_link}/>
          <h1>{this.state.clip.name}</h1>
          
          <ReactAudioPlayer
          
            className="audio-player"
            ref={this.audio}
            src={this.state.clip.gcloud_media_link}
            // autoPlay
            controls
          />
          {/* {this.props.currentUser ? this.showSaveButton(): null } */}
           

          {this.renderWords()}
        </div>
       
      );
    
  };

  render() {

    return (
      <Fragment >


        <div className="player-container"  >

        {this.state.clip === null ? 
            <BeatLoader
          // css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={true}
        />
            
            : this.showClip()  }
        </div>

      </Fragment>
    );
  }
}

export default withRouter(Clip);

