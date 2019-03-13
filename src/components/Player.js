import React, { Component, Fragment } from 'react'
import ReactAudioPlayer from 'react-audio-player';

const uuidv1 = require('uuid/v1');



class Player extends Component {
    constructor(props){
        super(props)
        this.audio = React.createRef();
        this.state = {
            player_position: 0,
        }
    }


onClickHandler = (e) => {
    this.audio.current.audioEl.currentTime = 3
     console.log("react player", this.audio.current.audioEl.currentTime) 
}





render(){
    const dirtyWords = JSON.parse(this.props.episode.words)
    const words = dirtyWords.map(w => JSON.parse(w))
    return (

        
        <Fragment>
        
            <div className="player-container">

                <ReactAudioPlayer
                    ref={this.audio}
                    src={`http://localhost:3000${this.props.episode.audio_file_url}#t=${this.state.player_position}`}
                    autoPlay
                    controls
                />
         

                <button onClick={this.onClickHandler}> Set Start </button>
                
            </div>
            
            

            <div>
                <h4>Transcript</h4>
                {this.props.episode.transcript}
            </div>
            <h4>words</h4>
            <div className="words-container">

                {words.map(w =>

                    <div className="word-card" key={uuidv1()}>
                        <p>{w.word}</p>
                        <p>{w.start_time} {w.end_time} </p>
                    </div>

                )}

            </div>
        </Fragment>

    )

}
    
    
    
}

export default Player