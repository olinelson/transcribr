import React, { Component, Fragment } from 'react'
import ReactAudioPlayer from 'react-audio-player';

const uuidv1 = require('uuid/v1');



class Player extends Component {
    constructor(props){
        super(props)
        this.audio = React.createRef();
      
    }


onClickHandler = (e) => {
    this.audio.current.audioEl.currentTime = 3
     console.log("react player", this.audio.current.audioEl.currentTime) 
}

    ifEpisodeSelected = () => {
        if (this.props.episode) {
            return(
                <ReactAudioPlayer
                    ref={this.audio}
                    src={`http://localhost:3000${this.props.episode.audio_file_url}`}
                    autoPlay
                    controls
                />
            )
            
        } else {
            return(
                <p>choose an episode to play</p>
            )
            
        }
    }





render(){
    
    return (

        <Fragment>
            {console.log(this.props)}
            <div className="player-container">

                

                {this.ifEpisodeSelected()}
         

                <button onClick={this.onClickHandler}> Set Start </button>
                
            </div>
            
            
           
        </Fragment>

    )

}
    
    
    
}

export default Player