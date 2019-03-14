import React from 'react'
import Word from "./Word"

const uuidv1 = require('uuid/v1');

 function Words(props) {

 const dirtyWords = JSON.parse(props.words)
 const words = dirtyWords.map(w => JSON.parse(w))

 const clickHandler = (e) => {

 }


  return (
    <div className="words-container">
      {/* {console.log(words)} */}
      {words.map(w => 
          <Word setTrackToPosition={props.setTrackToPosition} key={uuidv1()} word={w}/>
      )}
    </div>
  )
}

export default Words
