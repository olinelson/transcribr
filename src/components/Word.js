import React from 'react'

 function Word(props) {

    const clickHandler = () => {

        props.setPlayerPosition(props.word)
    }

  return (
      <div onClick={clickHandler}  className="word-cell">
      <p>{props.word.word}</p>
      <p>{props.word.start_time}</p>
    </div>
  )
}

export default Word
