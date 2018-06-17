import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import AppEquipes from './appequipes'
import AppCriarEquipe from './appcriarequipe'
// There's no special libraries or javascript layout systems, just code written for you.

render((
<Router>
  <Switch>
      <Route exact path="/" component={AppEquipes} />
      <Route exact path="/equipes" component={AppEquipes} />
      <Route path="/equipes/nova" component={AppCriarEquipe} />
  </Switch>
</Router>    ), document.getElementById('root'));