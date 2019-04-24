import React, { Component, Fragment } from "react";
import Word from "../components/Word";

import { DebounceInput } from 'react-debounce-input';

import { BeatLoader } from 'react-spinners';

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
    const wordSelection = this.state.filteredWords.slice(this.state.wordSelectionStart, this.state.wordSelectionEnd)
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
    const query = this.state.searchInput
    let oldWords = [...this.state.words];
    let newWords = oldWords.filter(w => w.word.includes(query));

    this.setState({
      filteredWords: newWords,
      loading: false,
      wordSelectionStart: 0,
      wordSelectionEnd: 500
    });
  } //end of filterWords

  
  // handles text input for search of words
  searchInputHandler = (e) =>{
    let input = e.target.value
    this.setState({
      searchInput: input
    })
    this.filterWords()
  }

  // if the users is at the end of the transcript, do not permit next page,
  // else go to next page
  nextPageHandler = () => {
    if (this.state.wordSelectionEnd >= this.state.words.length){
    }else {
      this.setState({
        wordSelectionStart: this.state.wordSelectionStart + 500,
        wordSelectionEnd: this.state.wordSelectionEnd + 500
      })
    }
  }


  // if the users is at the beginning of the transcript, do not permit next page,
  // else go to prevous page
  previousPageHandler = () => {
    if (this.state.wordSelectionStart <= 0) {
    } else {
      this.setState({
        wordSelectionStart: this.state.wordSelectionStart - 500,
        wordSelectionEnd: this.state.wordSelectionEnd - 500
      })
    }
  }

  render() {

    return (
      <Fragment>
        <div className="search-container">

          <BeatLoader
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={this.state.loading}
          />

          {this.state.words.length >= 0 ? 
            <DebounceInput
              label="search words"
              placeholder="search words..."
              debounceTimeout = { 200 }
              onChange={this.searchInputHandler}
              value={this.state.searchInput}
            /> 
          : null
          }
        </div>  {/* end of search container */}
       
        {/* stops the next and back page buttons displaying when the user is searching for a word */}
        {this.state.searchInput === "" && this.state.filteredWords.length >= 500 ?

          <Fragment>
            <div 
              className="word-page-button-container word-page-back-button-container" 
              onClick={this.previousPageHandler}
            > 
              <button> previous page </button> 
            </div>

            <div 
              className="word-page-button-container word-page-forward-button-container" 
              onClick={this.nextPageHandler}
            > 
              <button> next page </button> 
            </div>
          </Fragment>

        : null
        }

        <div className="words-container">
          {this.state.words ? this.showWords() : 
            <BeatLoader
              sizeUnit={"px"}
              size={150}
              color={'#123abc'}
              loading={true}
            />
          }
        </div>

      </Fragment>
    ); //end of return
  } // end of render
} // end of Words Class

export default Words;
