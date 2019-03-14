import React, { Fragment } from 'react'
import Words from './Words'

const Episode = (props) => {

const clickHandler = () => {

    props.selectEpisodeToPlay(props.episode)
}

return (
    <div onClick={clickHandler}  className="episode-cell">
    <h4>{props.episode.name}</h4>
    <Words setTrackToPosition={props.setTrackToPosition} words={props.episode.words}/>
    </div>
)
}

export default Episode






