import React, { Component } from 'react';

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaTarefas from './pagedraw/telatarefas'

const apiUrl = 'http://localhost:8080/Backend/mc426';

export default class AppTarefas extends Component {

  render() {
    return (
      <TelaTarefas nomeUsuario={this.state.nomeUsuario}
      				nomeProjeto={this.state.nomeProjeto} 
      			   listaTarefas={this.state.listaTarefas}/>
    );
  }

  constructor(props) {
  	super(props);
  	
    this.state = {
    	"nomeUsuario": window.localStorage.getItem('usuarioADA'),
    	"nomeProjeto": "",

	    "listaTarefas": [
	    ]
    };

    this.handleResponse = this.handleResponse.bind(this);
  }

  async handleResponse(response) {
		let authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));

		let responseProjeto;
		await fetch(apiUrl + response.projetos[0], {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    })
		.then(response => response.json())
		.then(response => responseProjeto = response);

		this.setState({nomeProjeto: responseProjeto.nome})

		for (var i = 0; i < responseProjeto.tarefas.length; i++) {
			fetch(apiUrl + responseProjeto.tarefas[i], {
			  method: 'GET',
			  headers: {
			    'Authorization': 'Basic ' + authorizationBasic, 
			    'Content-Type': 'application/json',
			  },
			}).then(response => response.json())
			.then(response => this.setState(prevState => ({
				  listaTarefas: [...prevState.listaTarefas, { "nomeTarefa": response.nome + " (" + response.id + ")", "prazo": response.prazo, "corProgresso": "#FF0000", "responsaveis": response.responsaveis.map(x => x.substring("/usuarios/".length)).join(', ')}]
				}))
			);
		}
	}

  componentDidMount() {
    console.log(window.localStorage.getItem('usuarioADA'));
		var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));


    console.log("GET " + apiUrl + "/projetos");
    console.log(authorizationBasic);
    fetch(apiUrl + "/projetos", {
		  method: 'GET',
		  headers: {
		    'Authorization': 'Basic ' + authorizationBasic
		  }
		}).then(response => response.json())
		.then(response => this.handleResponse(response));

  }
};

