import React from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Container,
  Icon,
  Header
} from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

function NewClipChooser() {
  return (
    // <div className="new-clip-chooser">
    //     <Link to="/upload">Upload Audio file</Link>
    //     <Link to="/uploadvideo">Upload Video file</Link>
    //     {/* for use for youtube dl... removed for now because of memory problems */}
    //     {/* <Link to="/addurl">Add YouTube URL Audio file</Link> */}

    // </div>
    <Container>
      <Segment placeholder>
      
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            {/* <Button content="Sign up" icon="signup" size="big" /> */}
            <Link
              className=" large ui button icon left labeled button"
              to="/upload"
            >
              <Icon name="file audio" />
              Audio File
            </Link>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Link
              className="large ui button icon left labeled button"
              to="/uploadvideo"
            >
              <Icon name="file video" />
              Video File
            </Link>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </Container>
  );
}

export default NewClipChooser;
