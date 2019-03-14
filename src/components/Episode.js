import React from 'react'


const Episode = (props) => {

const clickHandler = () => {

    props.selectEpisodeToPlay(props.episode.id)
}

return (
    <div onClick={clickHandler}  className="episode-cell">
    <h4>{props.episode.name}</h4>
    
    </div>
)
}

export default Episode






