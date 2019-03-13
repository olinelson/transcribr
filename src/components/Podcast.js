import React, { Component, Fragment } from 'react'
import Episode from "./Episode"
import ReactAudioPlayer from 'react-audio-player';

const Podcast = (props) => {
    console.log("this is props", props)

    const renderPodcast = () => {
        return(
        <Fragment>
            <h4>{props.podcast.name}</h4>
                <ReactAudioPlayer
                    // ref={this.audio}
                    // src={`http://localhost:3000${this.props.episode.audio_file_url}#t=${this.state.player_position}`}
                    autoPlay
                    controls
                />

            <h4>Episodes</h4>
            {props.podcast.episodes.map(e => 
            <Episode episode={e}/>
            )}

        </Fragment>

        )
    }



    return (
        <div className="podcast-container">
        {props.podcast ? 
         renderPodcast()
        : null
        }
        
        

        </div>
        
    )
}

export default Podcast