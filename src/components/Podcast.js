import React, { Fragment } from 'react'
import Episode from "./Episode"


const uuidv1 = require('uuid/v1');

const Podcast = (props) => {

    const submitHandler = (e) =>{
        e.preventDefault()
       
        let formData = new FormData
        formData.append('audio_file', e.target.fileInput.files[0])
        formData.append('name', e.target.name.value)
        formData.append('podcast_id', props.podcast.id)
        

        fetch('http://localhost:3000/api/v1/episodes', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
          
      
    } // end of submitHandler

   
   
    

    const renderPodcast = () => {
        return(
        <Fragment>
            
           
            <h4>Episodes</h4>
            {props.podcast.episodes.map(e => 
            <Episode selectEpisodeToPlay={props.selectEpisodeToPlay} key={uuidv1()} episode={e}/>
            )}

            <hr></hr>
                <h4>create episode</h4>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input name="name"></input>
                <label>File Upload</label>
                <input  name="fileInput" type="file"></input>
                <button>submit</button>
            </form>

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


