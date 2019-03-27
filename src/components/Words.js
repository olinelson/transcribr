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
        let input = e.target.value
        this.setState({
          searchInput: input
        })
        this.filterWords()
      }

     filterWords = () => {


        const query = this.state.searchInput

        let oldWords = [...this.state.words];

        let newWords = oldWords.filter(w => w.word.includes(query));
        console.log(newWords)
        this.setState({
          filteredWords: newWords,
          loading: false,
          wordSelectionStart: 0,
          wordSelectionEnd: 500

        });
     }

     nextPageHandler = () => {
        if (this.state.wordSelectionEnd >= this.state.words.length){

        
        }else {
          this.setState({
            wordSelectionStart: this.state.wordSelectionStart + 500,
            wordSelectionEnd: this.state.wordSelectionEnd + 500
          })
        }
        
     }

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
          {/* <h4>Search:</h4> */}
         <BeatLoader
          // css={override}
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
         

        

          
          
         

          
        </div>

          {this.state.searchInput === "" ?
          <Fragment>
          
            <button className="word-page-button word-page-back-button" onClick={this.previousPageHandler}> previous page </button>
          <button className="word-page-button word-page-forward-button" onClick={this.nextPageHandler}> next page </button>
         </Fragment>
          : null
        }

        <div className="words-container">

          {this.state.words ? this.showWords() : 
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
