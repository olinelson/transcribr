import React, { Fragment } from 'react'
import Episode from "./Episode"
import ReactAudioPlayer from 'react-audio-player';

const uuidv1 = require('uuid/v1');

const Podcast = (props) => {


   
    

    const renderPodcast = () => {
        return(
        <Fragment>
            
           
            <h4>Episodes</h4>
            {props.podcast.episodes.map(e => 
            <Episode selectEpisodeToPlay={props.selectEpisodeToPlay} key={uuidv1()} episode={e}/>
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






//     < h4 > { props.podcast.name }</h4 >
//         <ReactAudioPlayer
//             // ref={this.audio}
//             // src={`http://localhost:3000${this.props.episode.audio_file_url}#t=${this.state.player_position}`}
//             autoPlay
//             controls
//         />

//         <h4>Episodes</h4>
//             {
//     props.podcast.episodes.map(e =>
//         <Episode selectEpisodeToPlay={props.selectEpisodeToPlay} key={uuidv1()} episode={e} />
//     )
// }