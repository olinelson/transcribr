import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import {
  Search,
  Image,
  Container,
  Card,
  Divider,
  Item,
  Loader,
  Icon
} from "semantic-ui-react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import API_URL from "../config";

const resultRenderer = clip => (
  <Link
    key={clip.id}
    className="item"
    color="black"
    to={`/clips/${clip.search_id}`}
  >
    <Item.Image size="tiny" src={clip.gcloud_image_link} />

    <Item.Content>
      <Item.Header color="black" as="h4">
        {clip.name}
      </Item.Header>

      <Item.Meta>{clip.transcript.slice(0, 20)}...</Item.Meta>
    </Item.Content>
  </Link>
);

resultRenderer.propTypes = {
  title: PropTypes.string
  // key: PropTypes.number
};

// const initialState = {
//   isLoading: false,
//   results: [],
//   value: "",
//   clips: dummyImages
// };

class UserClipsContainer extends Component {
  state = {
    isLoading: false,
    results: [],
    value: "",
    clips: [],
    pageLoad: true
  };

  handleCardClick = id => {
    this.props.history.push(`/clips/${id}`);
  };

  componentDidMount = () => {
    this.getUsersClips();
  };

  unSaveClip = clip => {
    let token = localStorage.getItem("token");
    let id = clip.id;

    fetch(`${API_URL}/user_clips/unsave`, {
      method: "POST",
      body: JSON.stringify({
        clip_id: id
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    })
      .then(() => this.props.getCurrentUser())
      .then(() => this.getUsersClips());
  }; // end of unSaveClip

  unSaveClipHandler = c => {
    let clips = this.state.clips;
    let result = clips.filter(clip => clip.id !== c.id);

    this.setState({
      clips: result
    });

    this.unSaveClip(c);
  }; // end of unSaveClipHandler

  deleteClipHandler = c => {
    let clips = this.state.clips;
    let result = clips.filter(clip => clip.id !== c.id);

    this.setState({
      clips: result
    });

    this.deleteClip(c);
  };

  deleteClip = clip => {
    let token = localStorage.getItem("token");

    fetch(`${API_URL}/clips/${clip.id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });
  }; // end of deleteClip

  getUsersClips = () => {
    fetch(`${API_URL}/users/${this.props.currentUser.id}`)
      .then(r => r.json())
      .then(r =>
        this.setState({
          clips: r.data.attributes.clips,
          pageLoad: false
        })
      );
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({ isLoading: false, results: [], value: "" });

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = clip => re.test(clip.name);

      let results = _.filter(this.state.clips, isMatch);

      results = results.map(c => ({ ...c, search_id: c.id }));

      this.setState({
        isLoading: false,
        results: results
      });
    }, 300);
  };

  pageLoadedView = () => {
    return (
      <Container 
       
      >
        <Card.Group centered>
          {this.state.clips.map(c => (
            <Card
              columns={2}
              style={{
                cursor: "pointer"
              }}
            >
              {c.gcloud_image_link !== null ? (
                <div
                  style={{
                    backgroundImage: `url(${c.gcloud_image_link})`,
                    height: "10rem",
                    width: "auto",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                  onClick={() => this.handleCardClick(c.id)}
                />
              ) : (
                <div
                  style={{
                    backgroundImage: `url(https://storage.googleapis.com/bucket-of-doom/tape.jpeg)`,
                    height: "10rem",
                    width: "auto",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                  onClick={() => this.handleCardClick(c.id)}
                />
              )}

              <Card.Content onClick={() => this.handleCardClick(c.id)}>
                <Card.Header>{c.name}</Card.Header>
                <Card.Description>
                  {c.transcript
                    ? c.transcript.slice(0, 75)
                    : "no transcript yet"}
                </Card.Description>
              </Card.Content>

              <Card.Content extra>
                {c.author_id == this.props.currentUser.id ? (
                  <button
                    className="ui secondary button"
                    onClick={e => this.deleteClipHandler(c)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="ui secondary button"
                    onClick={() => this.unSaveClipHandler(c)}
                  >
                    {" "}
                    Remove{" "}
                  </button>
                )}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    );
  };

  render() {
    return (
      <Fragment>
        <Container
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Search
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={this.state.results}
            value={this.state.value}
            resultRenderer={resultRenderer}
            {...this.props}
          />
        </Container>
        <Divider />
        {!this.state.pageLoad ? (
          this.pageLoadedView()
        ) : (
          <Loader active inline="centered" />
        )}
      </Fragment>
    );
  }
}

export default withRouter(UserClipsContainer);
