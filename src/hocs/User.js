import React, { Fragment } from 'react'

// import ClipsContainer from './ClipsContainer'
import UserClipsContainer from "./UserClipsContainer"

function User(props) {

  const showUserName = (props) => {
    return(
      <div className="user-container">
        {props.currentUser.attributes.clips ? 
          < UserClipsContainer  
            currentUser = {props.currentUser}
            getCurrentUser={props.getCurrentUser}
          /> 
        : null}
      </div>
    )
  } //end of ShowUserName



  return (
    props.currentUser ? showUserName(props) : null
  )
} // end of User

export default User
