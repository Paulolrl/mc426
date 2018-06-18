import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaProjetos from './pagedraw/telaprojetos'
const apiUrl = 'http://localhost:8080/Backend/mc426'
export default class AppProjetos extends Component {

  render() {
    return (
      <TelaProjetos nomeUsuario={this.state.nomeUsuario}
      			   listaProjetos1={this.state.listaProjetos1}
      			   listaProjetos2={this.state.listaProjetos2}
      			   listaProjetos3={this.state.listaProjetos3}
                   listaProjetos4={this.state.listaProjetos4}/>
    );
  }

  constructor(props) {
  super(props);

    this.state = {
    	"nomeUsuario": window.localStorage.getItem('usuarioADA'),
	    "listaProjetos1": [
        ],
	    "listaProjetos2": [
        ],
	    "listaProjetos3": [
        ],
        "listaProjetos4": [
        ]
    };

    this.handleResponse = this.handleResponse.bind(this);
  }

  handleResponse(response) {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));
    for (var i = 0; i < response.projetos.length; i++) {
        if (i % 4 == 0){
            fetch(apiUrl + response.projetos[i], {
              method: 'GET',
              headers: {
                'Authorization': 'Basic ' + authorizationBasic,
                'Content-Type': 'application/json',
              },
            }).then(response => response.json())
            .then(response => this.setState(prevState => ({
                  listaprojetos1: [...prevState.listaProjetos1, { "nomeProjeto": response.nome }]
                }))
            );
        }
        else if (i % 4 == 1){
            fetch(apiUrl + response.projetos[i], {
              method: 'GET',
              headers: {
                'Authorization': 'Basic ' + authorizationBasic,
                'Content-Type': 'application/json',
              },
            }).then(response => response.json())
            .then(response => this.setState(prevState => ({
                  listaProjetos2: [...prevState.listaProjetos2, { "nomeProjeto": response.nome }]
                }))
            );
        }else if (i % 4 == 2){
            fetch(apiUrl + response.projetos[i], {
              method: 'GET',
              headers: {
                'Authorization': 'Basic ' + authorizationBasic,
                'Content-Type': 'application/json',
              },
            }).then(response => response.json())
            .then(response => this.setState(prevState => ({
                  listaProjetos3: [...prevState.listaProjetos3, { "nomeProjeto": response.nome }]
                }))
            );
        }
    }
  }

  componentDidMount() {
    console.log(window.localStorage.getItem('usuarioADA'));
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));
    fetch(apiUrl + "/projetos/",{
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + authorizationBasic,
        'Content-Type': 'application/json',
    },
    }).then(response => response.json())
        .then(response => this.handleResponse(response));
  }
};
