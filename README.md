This project connects to a my backend api which can be found here: https://github.com/olinelson/podcast_searcher_back

## What Is This?

This app creates clickable transcripts of words spoken in audio and video files using the Google speech-to-text API. Users can upload any format of Video file, Audio file or simply paste in a youtube video link.

## Get Started

In Order to connect to the backend of this project you will need a file named "config.js" located in the root of the project.
```
  let API_URL

  if (process.env["NODE_ENV"]=== "development"){
      API_URL = "http://localhost:3000/api/v1"
  }else{
      API_URL = "https://transcribr-backend.herokuapp.com/api/v1"
  }



  export default API_URL
```
