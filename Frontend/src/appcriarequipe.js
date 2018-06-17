import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarEquipes from './pagedraw/telacriarequipe'

export default class AppCriarEquipe extends Component {

  render() {
    return (
      <TelaCriarEquipes/>
    );
  }

  constructor() {
  super();
    this.state = {
    };
  }

  componentDidMount() {
  }
};

