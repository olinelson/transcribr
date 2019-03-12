import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// react router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />

          <Route exact path="/" component={this.Home} />
          
        </div>
      </Router>
    );
  }
   Home() {
  return <h2>Home</h2>;
}


}

export default App;
