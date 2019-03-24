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
    }).then(() => this.setState({ fileUploading: false }))
    .then(() => this.props.history.push(`/users/${this.props.currentUser.id}`))
     .then(() => this.props.getCurrentUser())
  }; // end of submitHandler

  render() {
  
    return (
      <Fragment>
        {this.props.currentUser ? 
        
      

        <div className="add-clip-form">
          <h4>Upload Clip</h4>
          <form onSubmit={this.submitHandler}>
            <label>Name</label>
            <input name="name" />
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
