import React, {Component, Fragment } from "react";
import LoadingBar from "./LoadingBar"

class AddClipForm extends Component {

    state = {
        loading: false
    }

    submitHandler = e => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("audio_file", e.target.fileInput.files[0]);
    formData.append("name", e.target.name.value);

    this.setState({loading: true})

    fetch("http://localhost:3000/api/v1/clips", {
      method: "POST",
      body: formData
    }).then( () => this.setState({loading: false}))
  }; // end of submitHandler


  render(){
      return (
          <Fragment>
              <LoadingBar loading={this.state.loading}/>
              <div className="add-clip-form">
                  <h4>create episode</h4>
                  <form onSubmit={this.submitHandler}>
                      <label>Name</label>
                      <input name="name" />
                      <label>File Upload</label>
                      <input name="fileInput" type="file" />
                      <button>submit</button>
                  </form>
              </div>
          </Fragment>
      );
  }
  
}

export default AddClipForm;
