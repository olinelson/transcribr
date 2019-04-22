import React, { Component, Fragment } from "react";
import { ClipLoader } from 'react-spinners';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import API_URL from "../config"


class AddUrlForm extends Component {
  state = {
    fileUploading: false,
    uploadComplete: false,
  };

  submitHandler = e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("video_url", e.target.url.value);

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
            <h1>Add Youtube Url</h1>
            <form className="add-clip-form" onSubmit={this.submitHandler}>
              <input required className="add-clip-title" name="url" placeholder="www.youtube-url.com"/>
            

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
                  < small ><FontAwesomeIcon icon = "check" />  done</small>
                </div>
              : null}
        
            </form>
          </div>
        : this.props.history.push(`/login`)
        }
      </Fragment>
    ); // end of return
  } // end of render
} // end of AddUrlForm Class

export default withRouter(AddUrlForm);
