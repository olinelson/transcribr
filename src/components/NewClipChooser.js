import React from 'react'

import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

 function NewClipChooser() {
  return (
    <div className="new-clip-chooser">
        <Link to="/upload">Upload Audio file</Link>
        <Link to="/uploadvideo">Upload Video file</Link>
        <Link to="/addurl">Add YouTube URL Audio file</Link>
       
      
    </div>
  )
}

export default NewClipChooser
