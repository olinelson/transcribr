import React, { Fragment } from 'react'

// import ClipsContainer from './ClipsContainer'
import UserClipsContainer from "./UserClipsContainer"

 function User(props) {

   const showUserName = (props) => {
    return(
        <div className="user-container">
        <h1>{props.user.user_name}</h1>
         {props.user.clips ? < UserClipsContainer deleteClip={props.deleteClip} user = {props.user}/> : null}
        </div>
    )
    }



  return (
      <Fragment>
   {props.user ? showUserName(props) : null}
  
    </Fragment>

  )
}

export default User
