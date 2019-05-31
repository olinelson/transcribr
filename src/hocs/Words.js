import React, { Component, Fragment } from "react";
import Word from "../components/Word";

import _ from "lodash";

import { BeatLoader } from "react-spinners";

import {
  Container,
  Button,
  Search,
  Icon,
  Pagination,
  Form
} from "semantic-ui-react";

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
    console.log(props.pageSize);
    let pages = [];
    let pageSize = props.pageSize;
    let i = pageSize;
    while (i < words.length + pageSize) {
      pages.push(words.slice(i - pageSize, i));
      i += pageSize;
    }

    console.log(pages);
    console.log("how many words", words.length);

    super(props);
    // word selection start and end used for page view, navigating forward and back
    this.state = {
      words: words,
      filteredWords: words,
      loading: false,
      searchInput: "",
      pages: pages,
      activePage: 1
    };
  } // end of constructor

  showWords = () => {
    // if a user is searching don't show them the page view,
    // show them all the words at once
    if (this.state.searchInput.length > 0) {
      return this.state.filteredWords.map(w => (
        <Word
          setPlayerPosition={this.props.setPlayerPosition}
          key={uuidv1()}
          word={w}
        />
      ));
    }

    let index = this.state.activePage - 1;
    console.log("this is pages", this.state.pages)


      return this.state.pages[index].map(w => (
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

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    return (
      <Fragment>
        {this.showSearchBarIfThereAreWords()}
        {/* <Form.Input
          label={`Page Size: ${this.state.pageSize} characters `}
          min={100}
          max={2000}
          name="pageSize"
          onChange={this.handleChange}
          step={100}
          type="range"
          value={this.state.pageSize}
        /> */}
        
        <Pagination
          onPageChange={this.handlePaginationChange}
          defaultActivePage={this.state.activePage}
          totalPages={this.state.pages.length}
          disabled={this.state.searchInput.length > 0 ? true : false}
        />
        <p 
          text 
          style={{
            border: "1px solid pink",
            

        
          }}
          >
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
        </p>
      </Fragment>
    ); //end of return
  } // end of render
} // end of Words Class

export default Words;
