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
  Loader
} from "semantic-ui-react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import API_URL from "../config";

// let source = [];

const resultRenderer = clip => (
  <Link key={clip.id} className="item" color="black" to={`/clips/${clip.search_id}`}>
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

const dummyImages = _.times(5, () => ({
  name: "loading",
  gcloud_image_link: "https://react.semantic-ui.com/images/wireframe/image.png"
}));

// const initialState = {
//   isLoading: false,
//   results: [],
//   value: "",
//   clips: dummyImages
// };

export default class SearchExampleStandard extends Component {
  state = {
    isLoading: false,
    results: [],
    value: "",
    clips: [],
    pageLoad: true
  };

  componentDidMount = () => {
    this.getUsersClips();
  };

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
      <Container>
        <Card.Group>
          {this.state.clips.map(c => (
            <Link className="ui card" to={`/clips/${c.id}`}>
              <div
                className="ui image medium"
                style={{
                  backgroundImage: `url(${c.gcloud_image_link})`,
                  backgroundSize: "cover",
                  height: "150px"
                }}
              />
              <Card.Content>
                <Card.Header>
                  {c.name}
                </Card.Header>
                <Card.Description>
                    {c.transcript ? c.transcript.slice(0,75) : "no transcript yet"}
                </Card.Description>
              </Card.Content>

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
            </Link>
          ))}
        </Card.Group>
      </Container>
    );
  };

  render() {
    return (
      <Fragment>
        <Container>
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
