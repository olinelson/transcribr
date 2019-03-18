import React, { Component, Fragment } from 'react'
import Word from "./Word"

const uuidv1 = require('uuid/v1');

 class Words extends Component {

 constructor(props){
     const dirtyWords = JSON.parse(props.words)
     const words = dirtyWords.map(w => JSON.parse(w))
     for (let wordObject of words){
        wordObject.word = wordObject.word.toLowerCase()
     }

     super(props)
     this.state = {
         words: words,
         filteredWords: words
     }
 }


 showWords = () => {

        return(
            this.state.filteredWords.map(w =>
                <Word setPlayerPosition={this.props.setPlayerPosition} key={uuidv1()} word={w} />
            )
        ) 
     
 }

 searchInputHandler = (e) => {
     let input = e.target.value
    
     let oldWords = [...this.state.words]
     let newWords = oldWords.filter(w => w.word.includes(input))
     this.setState({filteredWords: newWords})
    
 }

 render(){
     return (
         <Fragment>
         
         <div className="search-container">
             <h4>Search:</h4>
             <input onChange={this.searchInputHandler}></input>
         </div>
         <div className="words-container">
         
             {this.props.words ? this.showWords() : "no transcribed words yet"}

         </div>
         </Fragment>
     )


 }

  
}

export default Words
