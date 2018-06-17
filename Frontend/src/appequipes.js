import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaEquipes from './pagedraw/telaequipes'

export default class AppEquipes extends Component {

  render() {
    return (
      <TelaEquipes nomeUsuario={this.state.nomeUsuario} 
      			   listaEquipes1={this.state.listaEquipes1} 
      			   listaEquipes2={this.state.listaEquipes2} 
      			   listaEquipes3={this.state.listaEquipes3}/>
    );
  }

  constructor(props) {
  super(props);
  	
    this.state = {
    	"nomeUsuario": window.localStorage.getItem('usuarioADA'),

	    "listaEquipes1": [
	        {
	            "nomeEquipe": "Equipe 1"
	        },
	        {
	            "nomeEquipe": "Equipe4"
	        }
	    ],
	    "listaEquipes2": [
	        {
	            "nomeEquipe": "Equipe2"
	        }
	    ],
	    "listaEquipes3": [
	        {
	            "nomeEquipe": "Equipe3"
	        }
	    ]
    };
  }

  componentDidMount() {
    console.log(window.localStorage.getItem('usuarioADA'));
  }
};

