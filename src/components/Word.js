import React, { Component, Fragment } from "react";
import { Divider, Label, Item, Grid } from "semantic-ui-react";

class Word extends Component {
  state = {
    hover: false
  };

  onClickHandler = () => {
    this.props.setPlayerPosition(this.props.word);
  };

  showTimeStamp = () => {
    this.setState({ hover: true });
  };

  hideTimeStamp = () => {
    this.setState({ hover: false });
  };

  render() {
    return (
       <div onClick={this.onClickHandler} onMouseEnter={this.showTimeStamp} onMouseLeave={this.hideTimeStamp} className="word">
        <p>{this.props.word.word}</p>
        {this.state.clicked === true ? (
          <p className="word-stamp">{this.props.word.start_time}</p>
        ) : null}
      </div>
    )
  }
}

export default Word;
