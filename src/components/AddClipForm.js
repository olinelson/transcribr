import React, { Component, Fragment } from "react";

import { ClipLoader } from 'react-spinners';

import { withRouter } from "react-router-dom";

class AddClipForm extends Component {
  state = {
    fileUploading: false
  };

  submitHandler = e => {
    e.preventDefault();
    

    let formData = new FormData();

    formData.append("audio_file", e.target.audioFileInput.files[0]);
    formData.append("image", e.target.imageInput.files[0]);
    formData.append("name", e.target.name.value);
   
     let token = localStorage.getItem("token")

    this.setState({ fileUploading: true });

    fetch("http://localhost:3000/api/v1/clips", {
      method: "POST",
      headers: {
          "Authorization": token
      },
      body: formData

    })
    .then(() => this.setState({ fileUploading: false }))
    .then(() => this.props.getCurrentUser())
    .then(() => this.props.getAllClips())
    .then(()=> this.props.getUsersClips())
    .then(() => this.props.history.push(`/users/${this.props.currentUser.id}`))
    
  }; // end of submitHandler

  render() {
  
    return (
      <Fragment>
        {this.props.currentUser ? 

        <div className="add-clip-form-container">
          <h1>Upload Clip</h1>
          <form className="add-clip-form" onSubmit={this.submitHandler}>
            <label>Clip Title</label>
            <input name="name" placeholder="Clip Title"/>
            <label>Audio File</label>
            <input name="audioFileInput" type="file" />
            <label>Image</label>
            <input name="imageInput" type="file" />
            <button disabled={this.state.fileUploading}>submit</button>
            <ClipLoader
          // css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.fileUploading}
        />
          </form>
        </div>
        : this.props.history.push(`/login`)
        }
      </Fragment>
    );
  }
}

export default withRouter(AddClipForm);
