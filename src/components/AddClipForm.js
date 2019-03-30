import React, { Component, Fragment } from "react";

import { ClipLoader } from 'react-spinners';

import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// api URL
import API_URL from "./config"

class AddClipForm extends Component {
  state = {
    fileUploading: false,
    uploadComplete: false,
  };

  submitHandler = e => {

    e.preventDefault();
    console.log("submitting form")
    

    let formData = new FormData();

    formData.append("audio_file", e.target.audioFileInput.files[0]);
    formData.append("image", e.target.imageInput.files[0]);
    formData.append("name", e.target.name.value);
   
     let token = localStorage.getItem("token")

    this.setState({ fileUploading: true });
    console.log("using this url", `${API_URL}/clips`)
    fetch(`${API_URL}/clips`, {
      method: "POST",
      headers: {
          "Authorization": token
      },
      body: formData

    })
    .then( r => console.log(r))
    .then(() => this.setState({ 
      fileUploading: false,
      uploadComplete: true
     }))
     
    .then(() => this.props.getCurrentUser())
    // .then(() => this.props.getAllClips())
    // .then(()=> this.props.getUsersClips())
    .then(() => this.props.history.push(`/users/${this.props.currentUser.id}`))
    
  }; // end of submitHandler

  render() {
  
    return (
      <Fragment>
        {this.props.currentUser ? 

        <div className="add-clip-form-container">
          <h1>Upload Clip</h1>
          <form className="add-clip-form" onSubmit={this.submitHandler}>

            <input required className="add-clip-title" name="name" placeholder="Clip Title"/>
            <label className="add-clip-audio-label">Audio File</label>
            <input required className="add-clip-audio-input" name="audioFileInput" type="file" />
            <label className="add-clip-image-label">Image</label>
            <input required className="add-clip-image-input" name="imageInput" type="file" />
            {this.state.uploadComplete === false ?
            <button className="add-clip-submit" disabled={this.state.fileUploading}>upload</button>
            : 
            <button className="add-clip-submit" disabled>upload</button>
          }
            
            <ClipLoader
          // css={override}
          sizeUnit={"rem"}
          size={1}
          color={'#123abc'}
          loading={this.state.fileUploading}
        />
        {this.state.uploadComplete === true ?
          <div className="upload-complete-message">
           
          < small ><FontAwesomeIcon icon = "check" />  done</small>
        
         
          </div>
        : null}
        
          </form>
        </div>
        : this.props.history.push(`/login`)
        }
      </Fragment>
    );
  }
}

export default withRouter(AddClipForm);
