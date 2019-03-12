import React from 'react'

const Player = props => {
    console.log("episode" , props.episode.audio_file_url)
    return(
       
        <div className="player-container">
        
                <audio controls>
                    <source src={"localhost:3000" + props.episode.audio_file_url} type="audio/mp3" />
                </audio>
                
                
       
        
        </div>
      
    )
}

export default Player