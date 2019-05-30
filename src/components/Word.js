import React, { Component, Fragment } from "react";
import { Divider, Label, Item } from "semantic-ui-react";



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
      <Fragment>
        <span
          onClick={this.onClickHandler}
          onMouseEnter={this.showTimeStamp}
          onMouseLeave={this.hideTimeStamp}
          className="word"
        >
          {this.props.word.word}
          {"  "}
          {this.state.hover === true ? (
            <span className="word-stamp">{this.props.word.start_time}</span>
          ) : null}
        </span>
      </Fragment>
    );
  }
}

export default Word;
