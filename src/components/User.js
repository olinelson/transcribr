import React, { Fragment } from 'react'

// import ClipsContainer from './ClipsContainer'
import UserClipsContainer from "./UserClipsContainer"

 function User(props) {

   const showUserName = (props) => {
    return(
        <div className="user-container">
        <h1>{props.currentUser.user_name}</h1>
         {props.currentUser.clips ? 
         < UserClipsContainer 
            getAllClips={props.getAllClips} 
            getUsersClips={props.getUsersClips} 
            setFilteredUsersClips={props.setFilteredUsersClips} 
            usersFilteredClips={props.usersFilteredClips} 
            usersClips={props.usersClips}  
            currentUser = {props.currentUser}
            /> 
            : null}
        </div>
    )
    }



  return (
      <Fragment>
   {props.currentUser ? showUserName(props) : null}
  
    </Fragment>

  )
}

export default User
