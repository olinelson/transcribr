import React, { Component, Fragment } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import Words from "./Words"





class Player extends Component {
    constructor(props){
        super(props)
        this.audio = React.createRef();
      
    }


setPlayerPosition = (e) => {
    this.audio.current.audioEl.currentTime = e.start_time
  
}

    ifEpisodeSelected = () => {
        if (this.props.episode) {
            return(
                <Fragment>
                <ReactAudioPlayer
                    ref={this.audio}
                    src={`http://localhost:3000${this.props.episode.audio_file_url}`}
                    autoPlay
                    controls
                />

                    <Words setPlayerPosition={this.setPlayerPosition} words={this.props.episode.words} />
                </Fragment>
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
        
            <div className="player-container">

                

                {this.ifEpisodeSelected()}
         

               
                
            </div>
            
            
           
        </Fragment>

    )

}
    
    
    
}

export default Player