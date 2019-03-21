import React, { Fragment } from 'react'

import ClipsContainer from './ClipsContainer'

 function User(props) {

   const showUserName = (props) => {
    return(
        <div className="user-container">
        <h1>{props.user.email}</h1>
         {props.user.clips ? < ClipsContainer clips = {props.user.clips}/> : null}
        </div>
    )
    }


console.log(props.user)
  return (
      <Fragment>
   {props.user ? showUserName(props) : null}
  
    </Fragment>

  )
}

export default User
