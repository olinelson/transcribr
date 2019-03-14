import React from 'react'
import Word from "./Word"

const uuidv1 = require('uuid/v1');

 function Words(props) {

 

 const showWords = () =>{
     const dirtyWords = JSON.parse(props.words)
     const words = dirtyWords.map(w => JSON.parse(w))

        return(
            words.map(w =>
                <Word setPlayerPosition={props.setPlayerPosition} key={uuidv1()} word={w} />
            )
        ) 
     
 }

  return (
    <div className="words-container">
        {props.words ? showWords() : "no transcribed words yet"}
      
    </div>
  )
}

export default Words
