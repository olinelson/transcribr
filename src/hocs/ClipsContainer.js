import React, { Component, Fragment } from "react";

// browser router
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import { Container, Feed, Image, Icon, Label } from "semantic-ui-react";

// beat loader from react spinners
import { BeatLoader } from "react-spinners";

// api URL
import API_URL from "../config";

// unique id generator
const uuidv1 = require("uuid/v1");

class ClipsContainer extends Component {
  state = {
    clips: [],
    filteredClips: [],
    loading: true
  };

  // finds clips with titles that match input and puts result in state
  searchInputHandler = e => {
    let input = e.target.value;
    let result;
    result = [...this.state.clips].filter(c =>
      c.attributes.name.toLowerCase().includes(input)
    );
    this.setState({
      filteredClips: result,
      loading: false
    });
  };

  componentDidMount = () => {
    this.getAllClips();
  };

  //  gets all clips on load * will refactor to only on first load of app and when adding/ removing clips
  getAllClips = () => {
    fetch(`${API_URL}/clips`, {
      method: "GET"
    })
      .then(r => r.json())

      .then(r =>
        this.setState({
          clips: r.data,
          filteredClips: r.data,
          loading: false
        })
      );
  }; // end of getAllClips

  showClips = () => {
    if (this.state.filteredClips) {
      if (
        this.state.filteredClips.length === 0 &&
        this.state.loading === false
      ) {
        return (
          <Fragment>
            <p className="no-results-message">no results...</p>
          </Fragment>
        );
      } //end of no results if statements

      return this.state.filteredClips.map(c => (
        <Feed.Event key={uuidv1()}>
          {/* {console.log(c.attributes)} */}
          <Feed.Label>
            {c.attributes.media_type === "video" ? (
              <Image src={c.attributes.gcloud_image_link} />
            ) : (
              <Icon name="audio file" />
            )}
          </Feed.Label>

          <Feed.Content>
            <Feed.Summary>
              <Link
                className="clip-card-title"
                key={uuidv1()}
                to={`clips/${c.attributes.id}`}
              >
                {" "}
                {c.attributes.name}
              </Link>

              {c.attributes.transcript !== null ? (
                <Feed.Extra text>
                  {c.attributes.transcript.slice(0, 50)}...
                </Feed.Extra>
              ) : null}
            </Feed.Summary>
          </Feed.Content>

          <Feed.Meta text>
            <Label basic>
              <Icon name="user" /> {c.attributes.author.user_name}
            </Label>
          </Feed.Meta>
        </Feed.Event>
      ));
    } // end of if statement to wait for props
  }; //end of show clip

  render() {
    return (
      <Container>
        <div className="search-container">
          {/* <DebounceInput
            className="custom-input"
            label="search clips"
            placeholder="search for clips..."
            minLength={2}
            debounceTimeout={300}
            onChange={this.searchInputHandler}
          /> */}
        </div>

        <Feed>
          {this.state.loading === true ? <BeatLoader /> : null}
          {this.showClips()}
        </Feed>
      </Container> //end of clips container div
    ); // end of return
  } // end of render
} // end of ClipsContainer

export default ClipsContainer;
