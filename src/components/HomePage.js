import React, { Fragment } from "react";

import { Container, Segment, Grid, Divider, Icon } from "semantic-ui-react";

function HomePage() {
  return (
    <Fragment>
      <Container
        fluid
        style={{
          marginTop: "-1rem",
          backgroundImage:
            "url('https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
          backgroundSize: "cover",
          height: "90vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "grid",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          backgroundColor: "#C8C2C9"
        }}
      />
      <Container
        fluid
        // style={{
        //   backgroundColor: "#C8C2C9"
        // }}
      >
        <Container>
          <Divider hidden />
          <Segment padded="very">
            <Grid columns={2}>
              <Divider vertical>And</Divider>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <h4>Transcribe Any Audio Or Video File</h4>
                  <Icon size="big" name="file audio" />
                  <Icon size="big" name="file video" />
                </Grid.Column>

                <Grid.Column textAlign="center">
                  <h4>Download As Text File</h4>
                  <Icon size="big" name="download" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </Container>
      <Divider hidden />
      <Container fluid>
        <Segment textAlign="center">
          <Icon name="copyright" />
          Transcribr 2019
        </Segment>
      </Container>
    </Fragment>
  );
}

export default HomePage;
