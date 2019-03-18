import React, { Component } from "react";

class Word extends Component {
  state = {
    clicked: false
  };

  onClickHandler = () => {
    this.props.setPlayerPosition(this.props.word);
  }

  showTimeStamp = () => {
    this.setState({ clicked: true });

  };

    hideTimeStamp = () => {
        this.setState({ clicked: false });
    };

  render() {
    return (
        <div onClick={this.onClickHandler} onMouseOver={this.showTimeStamp} onMouseOut={this.hideTimeStamp} className="word">
        <p>{this.props.word.word}</p>
        {this.state.clicked === true ? (
          <p className="word-stamp">{this.props.word.start_time}</p>
        ) : null}
      </div>
    );
  }
}

export default Word;
