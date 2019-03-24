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

    };
  }

  showWords = () => {
    return this.state.filteredWords.map(w => (
      <Word
        setPlayerPosition={this.props.setPlayerPosition}
        key={uuidv1()}
        word={w}
      />
    ));
  };

     searchInputHandler = e => {
       this.setState({loading: true})

       const query = e.target.value
      console.log(e.target.value)
      this.filterWords(query)
        // this.setState(({loading: true})[this.filterWords(query)])
         

     }

     filterWords = (query) => {
       
       
        let oldWords = [...this.state.words];

        let newWords = oldWords.filter(w => w.word.includes(query));


        this.setState({
          filteredWords: newWords,

        });
     }

  render() {
    return (
      <Fragment>
        
        <div className="search-container">
          {/* <h4>Search:</h4> */}
       
         <DebounceInput
            label="search words"
            placeholder="search words..."
            minLength = { 2 }
            debounceTimeout = { 300 }
            onChange={this.searchInputHandler}
        
          /> 
         

          
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
