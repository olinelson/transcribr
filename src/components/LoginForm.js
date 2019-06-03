import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import {
  Grid,
  Button,
  Segment,
  Container,
  Divider,
  Form,
  Icon
} from "semantic-ui-react";

// api URL
import API_URL from "../config";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  submitHandler = e => {
    e.preventDefault();

    let email = this.state.email;
    let password = this.state.password;

    fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(r => {
        if (r.errors) {
          return alert(r.errors);
        } else {
          // console.log(r)
          this.props.setCurrentUser(r);
          this.props.getCurrentUser();
          this.props.history.push(`/`);
        }
      });
  };

  render() {
    return (
      <Container text>
        <Segment>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>Or</Divider>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <h1>Login</h1>
                <Form onSubmit={this.submitHandler}>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      className="email-input"
                      type="email"
                      placeholder="olaf@olafson.com"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      className="password-input"
                      type="password"
                      placeholder="your password"
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Field>

                  <Button type="submit">Submit</Button>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Link className="ui icon left labeled button" to="/signup">
                    Sign Up
                  <Icon name="signup" />
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default withRouter(LoginForm);
