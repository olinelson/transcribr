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

  formatStartTime = d => {
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    return (
      ("0" + h).slice(-2) +
      ":" +
      ("0" + m).slice(-2) +
      ":" +
      ("0" + s).slice(-2)
    );
  };

  render() {
    return (
      <Fragment>
        <div
          onClick={this.onClickHandler}
          onMouseEnter={this.showTimeStamp}
          onMouseLeave={this.hideTimeStamp}
          className="word"
        >
          <p>{this.props.word.word}</p>
          {this.state.hover === true ? (
            <Label className="time-stamp-label" pointing>
              {this.formatStartTime(this.props.word.start_time)}
            </Label>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default Word;
