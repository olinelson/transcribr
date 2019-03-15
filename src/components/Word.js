import React, { Component } from 'react'

 class Word extends Component {

    state = {
        clicked: false
    }


    clickHandler = () => {

        this.props.setPlayerPosition(this.props.word)
        this.setState({clicked: true})
        setTimeout(() => this.setState({clicked: false}), 500)
    }



    render(){
        return (
            <div onClick={this.clickHandler} className="word-cell">

                <p>{this.props.word.word}</p>
                {this.state.clicked === true ? 
                    <p>{this.props.word.start_time}</p>
                : null}
                
            </div>
        )
    }
  
}

export default Word
