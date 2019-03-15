import React, { Component, Fragment } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import Words from "./Words"
import Transcription from "./Transcription"





class Clip extends Component {
    constructor(props){
        super(props)
        this.audio = React.createRef();
      
    }


setPlayerPosition = (e) => {
    this.audio.current.audioEl.currentTime = e.start_time
  
}

    ifClipSelected = () => {
        if (this.props.clip) {
            return(
                <Fragment>
                <ReactAudioPlayer
                    ref={this.audio}
                    src={`http://localhost:3000${this.props.clip.audio_file_url}`}
                    autoPlay
                    controls
                />

                    <Words setPlayerPosition={this.setPlayerPosition} words={this.props.clip.words} />
                    {/* <Transcription transcript={this.props.clip.transcript}/> */}
                </Fragment>
            )
            
        } else {
            return(
                <p>choose an clip to play</p>
            )
            
        }
    }





render(){
    
    return (

        <Fragment>
        
            <div className="player-container">
                
                

                {this.ifClipSelected()}
         

               
                
            </div>
            
            
           
        </Fragment>

    )

}
    
    
    
}

export default Clip