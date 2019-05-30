import React, { Component, Fragment } from "react";

import { ClipLoader } from 'react-spinners';

import { withRouter } from "react-router-dom";


import API_URL from "../config"

class AddVideoClipForm extends Component {
  state = {
    fileUploading: false,
    uploadComplete: false,
  };

  submitHandler = e => {
    e.preventDefault();
    let formData = new FormData();

    console.log(e.target)

    formData.append("video_file", e.target.audioFileInput.files[0]);
    // formData.append("image", e.target.imageInput.files[0]);
    formData.append("name", e.target.name.value);
   
    let token = localStorage.getItem("token")

    this.setState({ fileUploading: true });

    fetch(`${API_URL}/clips`, {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: formData
    })
    .then(() => this.setState({ 
      fileUploading: false,
      uploadComplete: true
     }))
    .then(() => this.props.getCurrentUser())
    .then(() => this.props.history.push(`/users/${this.props.currentUser.id}`))
    
  }; // end of submitHandler

  render() {
  
    return (
      <Fragment>
        {this.props.currentUser ? 

          <div className="add-clip-form-container">
            <h1>Upload Video</h1>
            <form className="add-clip-form" onSubmit={this.submitHandler}>
              <input required className="add-clip-title" name="name" placeholder="Clip Title"/>
              <label className="add-clip-audio-label">Video File</label>
              <input required className="add-clip-audio-input" name="audioFileInput" type="file" />
              {/* <label className="add-clip-image-label">Image</label> */}
              {/* <input required className="add-clip-image-input" name="imageInput" type="file" /> */}

              {/* disabled upload button while uploading */}
              {this.state.uploadComplete === false ?
              <button className="add-clip-submit" disabled={this.state.fileUploading}>upload</button>
              : 
              <button className="add-clip-submit" disabled>upload</button>
              }
            
              <ClipLoader
                sizeUnit={"rem"}
                size={1}
                color={'#123abc'}
                loading={this.state.fileUploading}
              />
              {this.state.uploadComplete === true ?
                <div className="upload-complete-message">
                  < small >  done</small>
                </div>
              : null}
        
            </form>
          </div>
        : this.props.history.push(`/login`)
        }
      </Fragment>
    ); // end of return
  } // end of render
} // end of AddVideoClipForm Class

export default withRouter(AddVideoClipForm);
