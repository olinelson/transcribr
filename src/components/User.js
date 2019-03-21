import React, { Fragment } from 'react'

import ClipsContainer from './ClipsContainer'

 function User(props) {

   const showUserName = (props) => {
    return(
        <div className="user-container">
        <h1>{props.user.user_name}</h1>
         {props.user.clips ? < ClipsContainer clips = {props.user.clips}/> : null}
        </div>
    )
    }


console.log("in user",props.user)
  return (
      <Fragment>
   {props.user ? showUserName(props) : null}
  
    </Fragment>

  )
}

export default User
