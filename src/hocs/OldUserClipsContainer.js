import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import _ from "lodash";

import { DebounceInput } from "react-debounce-input";
import { BeatLoader } from "react-spinners";

// api URL
import API_URL from "../config";

import { Card, Icon, Image, Container, Search, Label } from "semantic-ui-react";

const uuidv1 = require("uuid/v1");

const resultRenderer = clip => (
  <Fragment key={uuidv1()}>
    {console.log("in clip", clip)}
    <Link className="ui label" to={`/clips/${clip.id}`}>
      {clip.name}
    </Link>
  </Fragment>
);

resultRenderer.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number
};

class UserClipsContainer extends Component {
  state = {
    clips: [],
    value: "",
    loading: false,
    searchTranscript: false,
    results: []
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.name });

  componentDidMount = () => {
    this.getUsersClips();
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      // if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.clips, isMatch)
      });
    }, 300);
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

  getUsersClips = () => {
    fetch(`${API_URL}/users/${this.props.currentUser.id}`)
      .then(r => r.json())
      .then(r =>
        this.setState({
          clips: r.data.attributes.clips,
          filteredClips: r.data.attributes.clips,
          loading: false
        })
      );
  };

  filterCondition = (clip, query) => {
    return clip.name.toLowerCase().includes(query);
  };

  searchInputHandler = e => {
    let query = e.target.value;
    let results;

    if (this.state.searchTranscript === true) {
      results = this.state.clips.filter(
        c => c.transcript !== null && c.transcript.includes(query)
      );
    } else {
      results = this.state.clips.filter(c =>
        c.name.toLowerCase().includes(query)
      );
    }

    this.setState({ filteredClips: results });
  };

  unSaveClipHandler = c => {
    let clips = this.state.filteredClips;
    let result = clips.filter(clip => clip.id !== c.id);

    this.setState({
      clips: result,
      filteredClips: result
    });

    this.unSaveClip(c);
  }; // end of unSaveClipHandler

  deleteClipHandler = c => {
    let clips = this.state.filteredClips;
    let result = clips.filter(clip => clip.id !== c.id);

    this.setState({
      clips: result,
      filteredClips: result
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

  render() {
    // console.log(this.state.results);
    return (
      <Container>
        <div className="search-container">
          {/* <DebounceInput
            className="custom-input"
            label="search clips"
            placeholder="search clips..."
            minLength={2}
            debounceTimeout={200}
            onChange={this.searchInputHandler}
          /> */}
          {/* <Search
            loading={this.state.loading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.searchInputHandler, 200, {
              leading: true
            })}
            results={this.state.filteredClips}
            resultRenderer={this.resultRenderer}
            // value={''}
            // {...this.props}
          /> */}
          <Search
            loading={this.state.loading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={this.state.results}
            value={this.state.value}
            resultRenderer={this.resultRenderer}
            // {...this.props}
          />
          {/* <input
            type="checkbox"
            className="checkbox"
            name="search transcript"
            onClick={() =>
              this.setState({ searchTranscript: !this.state.searchTranscript })
            }
            checked={this.state.searchTranscript}
          /> */}
          {/* <label name="search transcript">Search Transcripts</label> */}
        </div>{" "}
        {/* end of search-container div  */}
        <div className="clips-grid">
          {this.state.loading === true ? <BeatLoader /> : null}

          {this.state.clips.map(c => (
            <Card key={uuidv1()}>
              <Image src={c.gcloud_image_link} wrapped ui={false} />

              <Link className="ui header" key={uuidv1()} to={`/clips/${c.id}`}>
                {c.name}
              </Link>
              <Card.Content extra>
                {c.author_id == this.props.currentUser.id ? (
                  <button
                    className="ui secondary button"
                    onClick={e => this.deleteClipHandler(c)}
                  >
                    {" "}
                    Delete{" "}
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
            </Card> // end of clip-card div
          ))}
        </div>{" "}
        {/* end of clips-grid div */}
      </Container> // end of clips-container-div
    ); //end of return
  } // end of render
} // end of class

export default UserClipsContainer;
