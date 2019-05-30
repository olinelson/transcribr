import React, { Component, Fragment } from "react";

import { ClipLoader } from "react-spinners";

import { withRouter } from "react-router-dom";

import { Container, Form, Button } from "semantic-ui-react";

import API_URL from "../config";

class AddClipForm extends Component {
  state = {
    fileUploading: false,
    uploadComplete: false
  };

  submitHandler = e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("audio_file", e.target.audioFileInput.files[0]);
    formData.append("image", e.target.imageInput.files[0]);
    formData.append("name", e.target.name.value);

    let token = localStorage.getItem("token");

    this.setState({ fileUploading: true });

    fetch(`${API_URL}/clips`, {
      method: "POST",
      headers: {
        Authorization: token
      },
      body: formData
    })
      .then(() =>
        this.setState({
          fileUploading: false,
          uploadComplete: true
        })
      )
      .then(() => this.props.getCurrentUser())
      .then(() =>
        this.props.history.push(`/users/${this.props.currentUser.id}`)
      );
  }; // end of submitHandler

  loggedInView = () => {
    return (
      <Container>
        <h1>Upload Clip</h1>
        <Form onSubmit={this.submitHandler}>
          <Form.Field>
            <label>Clip Name</label>
            <input
              required
              className="add-clip-title"
              name="name"
              placeholder="Clip Title"
            />
          </Form.Field>
          <Form.Field>
            <label className="add-clip-audio-label">Audio File</label>
            <input
              required
              className="add-clip-audio-input"
              name="audioFileInput"
              type="file"
            />
          </Form.Field>
          <Form.Field>
            <label className="add-clip-image-label">Image</label>
            <input
              required
              className="add-clip-image-input"
              name="imageInput"
              type="file"
            />
          </Form.Field>

          {/* disabled upload button while uploading */}
          {this.state.uploadComplete === false ? (
            <Button
              className="add-clip-submit"
              disabled={this.state.fileUploading}
            >
              upload
            </Button>
          ) : (
            <Button className="add-clip-submit" disabled>
              upload
            </Button>
          )}

          <ClipLoader
            sizeUnit={"rem"}
            size={1}
            color={"#123abc"}
            loading={this.state.fileUploading}
          />
          {this.state.uploadComplete === true ? (
            <div className="upload-complete-message">
              <small> done</small>
            </div>
          ) : null}
        </Form>
      </Container>
    );
  };

  render() {
    return (
      <Fragment>
        {this.props.currentUser
          ? this.loggedInView()
          : this.props.history.push(`/login`)}
      </Fragment>
    ); // end of return
  } // end of render
} // end of addClipForm Class

export default withRouter(AddClipForm);
