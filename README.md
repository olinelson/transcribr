This project connects to a my backend api which can be found here: https://github.com/olinelson/podcast_searcher_back

## What Is This?

This app creates clickable transcripts of words spoken in audio and video files using the Google speech-to-text API. Users can upload any format of Video file, Audio file or simply paste in a youtube video link.

## Get Started

In Order to connect to the backend of this project you will need a file named "config.js" located in the root of the project.
The File should contain the following:
```
  let API_URL

  if (process.env["NODE_ENV"]=== "development"){
      API_URL = "http://localhost:3000/api/v1" // put your development server url here
  }else{
      API_URL = "https://your_app_goes_here.herokuapp.com/api/v1" // production server url
  }



  export default API_URL
```

The API_URL variables above are used throught the application in fetch functions to pull data from the backend API. The simple If/Else logic is to allow you to automatically switch URLs when Development or Production Environment is detected.
