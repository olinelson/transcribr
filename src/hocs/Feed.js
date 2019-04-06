import React, { Fragment } from 'react'

// components
import ClipsContainer from "../components/ClipsContainer"

function Feed(props) {
  return (
    <Fragment>
        <ClipsContainer
          filterClips={props.filterClips}
          getAllClips={props.getAllClips}
          filteredClips={props.filteredClips}
          clips={props.clips}
        />


      </Fragment>
  )
}

export default Feed
