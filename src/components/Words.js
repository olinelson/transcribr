import React, { Component, Fragment } from "react";
import Word from "./Word";

import { DebounceInput } from 'react-debounce-input';

import { BeatLoader } from 'react-spinners';



const uuidv1 = require("uuid/v1");

class Words extends Component {
  constructor(props) {
    const dirtyWords = JSON.parse(props.words);
    const words = dirtyWords.map(w => JSON.parse(w));
    for (let wordObject of words) {
      wordObject.word = wordObject.word.toLowerCase();
    }
   

    super(props);
    this.state = {
      words: words,
      filteredWords: words,
      wordSelectionStart: 0,
      wordSelectionEnd: 500,

      loading: false,
      searchInput: ""

    };
  }

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
  

      searchInputHandler = (e) =>{
        this.filterWords(e)
      }

     filterWords = (e) => {
        const query = e.target.value
        console.log(e)
        let oldWords = [...this.state.words];

        let newWords = oldWords.filter(w => w.word.includes(query));

        this.setState({
          filteredWords: newWords,
          loading: false

        });
     }

     nextPageHandler = () => {
        if (this.state.wordSelectionEnd >= this.state.words.length){
         console.log("you are atthe end")
        
        }else {
          this.setState({
            wordSelectionStart: this.state.wordSelectionStart + 500,
            wordSelectionEnd: this.state.wordSelectionEnd + 500
          })
        }
        
     }

     previousPageHandler = () => {
       if (this.state.wordSelectionStart <= 0) {
         console.log("you are back to the beginning")

       } else {
         this.setState({
           wordSelectionStart: this.state.wordSelectionStart - 500,
           wordSelectionEnd: this.state.wordSelectionEnd - 500
         })
       }

     }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        
        <div className="search-container">
          {/* <h4>Search:</h4> */}
         <BeatLoader
          // css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
        />

        <button onClick={this.previousPageHandler}> previous page </button>

         <DebounceInput
            label="search words"
            placeholder="search words..."
            minLength = { 2 }
            debounceTimeout = { 500 }
            onChange={this.searchInputHandler}
            onKeyDown={this.spinner}
        
          /> 

          <button onClick={this.nextPageHandler}> next page </button>
          
         

          
        </div>
        <div className="words-container">

          {this.props.words ? this.showWords() : 
          <BeatLoader
          // css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={true}
        />}
        </div>
      </Fragment>
    );
  }
}

export default Words;
