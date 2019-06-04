import React, { Component } from "react";

import Words from "./Words";

import ReactPlayer from "react-player";

import API_URL from "../config";

import { BeatLoader, PacmanLoader } from "react-spinners";

import { withRouter } from "react-router-dom";

import { Container, Button, Grid, Image, Loader, Icon } from "semantic-ui-react";

import ImageWireframe from "../ImageWireframe.png";

class Clip extends Component {
  constructor(props) {
    super(props);
    this.clip = React.createRef();

    this.state = {
      clip: null,
      processing: false
    };
  }

  setPlayerPosition = e => {
    this.clip.current.seekTo(Math.floor(e.start_time), "seconds");
  };

  componentDidMount = () => {
    this.getClip();
  };

  isClipProcessing = clip => {
    if (clip.processing === true) {
      this.setState({
        clip: clip,
        processing: true
      });
    } else {
      this.setState({
        clip: clip,
        processing: false
      });
    }
  };

  getClip = () => {
    fetch(`${API_URL}/clips/${this.props.id}`, {
      method: "GET"
    })
      .then(r => r.json())
      .then(r => this.isClipProcessing(r.data.attributes));
  };

  // conditionaly renders save or saved button if the clip exists in curret User Clips
  showButtonIfSaved = () => {
    let currentUserClips = this.props.currentUser.attributes.clips;

    for (let clip of currentUserClips) {
      if (clip.id === this.state.clip.id) {
        return <Button disabled>saved</Button>;
      }
    } // end of for of loop

    return <Button onClick={this.saveClip}>save</Button>;
  }; // end of showButtonIfSaved

  saveClip = () => {
    let token = localStorage.getItem("token");
    let id = this.state.clip.id;

    fetch(`${API_URL}/user_clips`, {
      method: "POST",
      body: JSON.stringify({
        clip_id: id
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    }).then(() => this.props.getCurrentUser());
  };

  renderWords = () => {
    if (this.state.clip.words) {
      return (
        <Words
          setPlayerPosition={this.setPlayerPosition}
          words={this.state.clip.words}
          pageSize={500}
        />
      );
    }
    // shows process audio button if the clip isn't processing and there are no words
    if (this.state.processing === false) {
      return (
        <Button className="process-audio-button" onClick={this.processAudio}>
          process audio
        </Button>
      );
    }
  }; // end of render words

  processAudio = () => {
    this.setState({ processing: true });

    let token = localStorage.getItem("token");
    let id = this.state.clip.id;

    fetch(`${API_URL}/audio_process`, {
      method: "POST",
      body: JSON.stringify({
        clip_id: id
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    }).then(() => this.getClip());
  }; // end of processAudio

  // started working on default image if none uploaded by user
  showImage = () => {
    if (this.state.clip.gcloud_image_link === "") {
      return <Icon name="file audio"/>;
    } else {
      return (
        <Image
          style={{
            backgroundImage: `url(${this.state.clip.gcloud_image_link})`,
            height: "100%",
            width: "auto",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        />
      );
    }
  }; // end of showImage

  showVideoClip = () => {
    return (
      <Container>
        <ReactPlayer
          ref={this.clip}
          url={this.state.clip.gcloud_media_link}
          width="100%"
          height="100%"
          playing
          controls
          pip={true}
        />

        <Container>
          <h1>{this.state.clip.name}</h1>
          {this.props.currentUser === null ? null : this.showButtonIfSaved()}
        </Container>

        {this.renderWords()}

        {this.state.processing === true ? (
          <Container textAlign="center">
            <Loader inline active>
              Transcribing clip. We'll email you when its done!
            </Loader>
          </Container>
        ) : null}
      </Container>
    ); //end of return
  };

  showAudioClip = () => {
    return (
      <Container>
        <Grid >
          <Grid.Row >
            {/* <Grid.Column width={4}>{this.showImage()}</Grid.Column> */}
            <Grid.Column >
              <Container>
                <h1>{this.state.clip.name}</h1>
                {this.props.currentUser === null
                  ? null
                  : this.showButtonIfSaved()}
                <ReactPlayer
                  ref={this.clip}
                  url={this.state.clip.gcloud_media_link}
                  width="100%"
                  height="3.5rem"
                  playing
                  controls
                />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {this.renderWords()}

        {this.state.processing === true ? (
          <Loader active>
            Transcribing clip. We'll email you when its done!
          </Loader>
        ) : null}
      </Container>
    ); // end of return
  }; // end of showAudioClip

  showVideoOrAudioClip = () => {
    if (this.state.clip.media_type === "audio") {
      return this.showAudioClip();
    }
    if (this.state.clip.media_type === "video") {
      return this.showVideoClip();
    }
  }; // end of showClip

  render() {
    console.log("hello", this.state.processing);
    return (
      <Container>
        {this.state.clip === null ? (
          <BeatLoader sizeUnit={"rem"} size={1} loading={true} />
        ) : (
          this.showVideoOrAudioClip()
        )}
      </Container>
    );
  } // end of render
} // end of Clip class

export default withRouter(Clip);
