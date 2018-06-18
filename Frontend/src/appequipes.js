import React, { Component } from 'react';

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaEquipes from './pagedraw/telaequipes'

const apiUrl = 'http://localhost:8080/Backend/mc426';

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
	    ],
	    "listaEquipes2": [
	    ],
	    "listaEquipes3": [
	    ]
    };

    this.handleResponse = this.handleResponse.bind(this);
  }

  handleResponse(response) {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));
		for (var i = 0; i < response.equipes.length; i++) {
			console.log(response);
			console.log(this);

			if (i % 3 === 0)
			{
				fetch(apiUrl + response.equipes[i], {
				  method: 'GET',
				  headers: {
				    'Authorization': 'Basic ' + authorizationBasic, 
				    'Content-Type': 'application/json',
				  },
				}).then(response => response.json())
				.then(response => this.setState(prevState => ({
					  listaEquipes1: [...prevState.listaEquipes1, { "nomeEquipe": response.nome + " (" + response.id + ")", "resourceEquipe": "/equipes/" + response.id}]
					}))
				);
			}
			else if (i % 3 === 1)
			{
				fetch(apiUrl + response.equipes[i], {
				  method: 'GET',
				  headers: {
				    'Authorization': 'Basic ' + authorizationBasic, 
				    'Content-Type': 'application/json',
				  },
				}).then(response => response.json())
				.then(response => this.setState(prevState => ({
					  listaEquipes2: [...prevState.listaEquipes2, { "nomeEquipe": response.nome + " (" + response.id + ")", "resourceEquipe": "/equipes/" + response.id }]
					}))
				);
			}
			else
			{
				fetch(apiUrl + response.equipes[i], {
				  method: 'GET',
				  headers: {
				    'Authorization': 'Basic ' + authorizationBasic, 
				    'Content-Type': 'application/json',
				  },
				}).then(response => response.json())
				.then(response => this.setState(prevState => ({
					  listaEquipes3: [...prevState.listaEquipes3, { "nomeEquipe": response.nome + " (" + response.id + ")", "resourceEquipe": "/equipes/" + response.id }]
					}))
				);
			}
		} 
	}

  componentDidMount() {
    console.log(window.localStorage.getItem('usuarioADA'));

    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));

    console.log("GET " + apiUrl + "/usuarios/" + this.state.nomeUsuario);
    console.log(authorizationBasic);
    fetch(apiUrl + "/usuarios/" + this.state.nomeUsuario, {
		  method: 'GET',
		  headers: {
		    'Authorization': 'Basic ' + authorizationBasic
		  }
		}).then(response => response.json())
		.then(response => this.handleResponse(response));
  }
};

