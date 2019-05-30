import React, { Component, Fragment } from "react";
import Word from "../components/Word";

import _ from "lodash";

import { BeatLoader } from "react-spinners";

import { Container, Button, Search } from "semantic-ui-react";

const uuidv1 = require("uuid/v1");

class Words extends Component {
  constructor(props) {
    // this filteres the output of the api into usable JSON
    const unfilteredWords = JSON.parse(props.words);
    // repeats the process for the individual words
    const words = unfilteredWords.map(w => JSON.parse(w));

    // for consistency, interates through all text of words and makes them lowercase
    for (let wordObject of words) {
      wordObject.word = wordObject.word.toLowerCase();
    }

    super(props);
    // word selection start and end used for page view, navigating forward and back
    this.state = {
      words: words,
      filteredWords: words,
      wordSelectionStart: 0,
      wordSelectionEnd: 500,
      loading: false,
      searchInput: ""
    };
  } // end of constructor

  showWords = () => {
    const wordSelection = this.state.filteredWords.slice(
      this.state.wordSelectionStart,
      this.state.wordSelectionEnd
    );
    return wordSelection.map(w => (
      <Word
        setPlayerPosition={this.props.setPlayerPosition}
        key={uuidv1()}
        word={w}
      />
    ));
  };

  // filters words shown on page for use with the search input field
  // resets the wordSelection to make sure that search results aren't hidden
  filterWords = () => {
    const query = this.state.searchInput;
    let oldWords = [...this.state.words];
    let newWords = oldWords.filter(w => w.word.includes(query));

    this.setState({
      filteredWords: newWords,
      loading: false,
      wordSelectionStart: 0,
      wordSelectionEnd: 500
    });
  }; //end of filterWords

  // handles text input for search of words
  searchInputHandler = e => {
    let input = e.target.value;
    this.setState({
      searchInput: input
    });
    this.filterWords();
  };

  // if the users is at the end of the transcript, do not permit next page,
  // else go to next page
  nextPageHandler = () => {
    if (this.state.wordSelectionEnd >= this.state.words.length) {
    } else {
      this.setState({
        wordSelectionStart: this.state.wordSelectionStart + 500,
        wordSelectionEnd: this.state.wordSelectionEnd + 500
      });
    }
  };

  // if the users is at the beginning of the transcript, do not permit next page,
  // else go to prevous page
  previousPageHandler = () => {
    if (this.state.wordSelectionStart <= 0) {
    } else {
      this.setState({
        wordSelectionStart: this.state.wordSelectionStart - 500,
        wordSelectionEnd: this.state.wordSelectionEnd - 500
      });
    }
  };

  showSearchBarIfThereAreWords = () => {
    if (this.state.words.length >= 0) {
      return (
        <Search
          onSearchChange={_.debounce(this.searchInputHandler, 500, {
            leading: true
          })}
          open={false}
          value={this.state.searchInput}
        />
      );
    }
  };

  showPageNavButtonsIfNotSearchingAndThereAreMultiplePages = () => {
    if (
      this.state.searchInput === "" &&
      this.state.filteredWords.length >= 500
    ) {
      return (
        <Fragment>
          <Container
            className="word-page-button-container word-page-back-button-container"
            onClick={this.previousPageHandler}
          >
            <Button> previous page </Button>
          </Container>

          <Container
            className="word-page-button-container word-page-forward-button-container"
            onClick={this.nextPageHandler}
          >
            <Button> next page </Button>
          </Container>
        </Fragment>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <Container text>
          {this.showSearchBarIfThereAreWords()}
        </Container>


        {this.showPageNavButtonsIfNotSearchingAndThereAreMultiplePages()}

        <Container textAlign="justified">
          {this.state.words ? (
            this.showWords()
          ) : (
            <BeatLoader
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={true}
            />
          )}
        </Container>
      </Fragment>
    ); //end of return
  } // end of render
} // end of Words Class

export default Words;
