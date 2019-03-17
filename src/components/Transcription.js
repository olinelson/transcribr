import React from 'react'

function Transcription(props) {
  return (
    <div>
      <h4>Transcription</h4>
      {props.transcript? 
      <p>{props.transcript}</p>
      : "nothing here"}
    </div>
  )
}

export default Transcription
