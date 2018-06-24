import React, { Component } from 'react';

// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaTarefas from './pagedraw/telatarefas'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'semantic-ui-css/semantic.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'


const apiUrl = 'http://localhost:8080/Backend/mc426';

export default class AppTarefas extends Component {

  render() {
    return (
    	<MuiThemeProvider>
      <TelaTarefas nomeUsuario={this.state.nomeUsuario}
      			   listaTarefas={this.state.listaTarefas}
      			   listaOpcoes={this.state.listaOpcoes}
      			   onChangeDropdown={this.onChangeDropdown}
      			   valueDropdown={this.state.valueDropdown}
      			   />
      </MuiThemeProvider>
    );
  }

  constructor(props) {
  	super(props);
  	
    this.state = {
    	"nomeUsuario": window.localStorage.getItem('usuarioADA'),
	    "listaTarefas": [],
	    valueDropdown: "" + this.props.match.params.idProjeto,
	    listaOpcoes: [],
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.onChangeDropdown = this.onChangeDropdown.bind(this);
  }

  async onChangeDropdown(evt, data) {
		let authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));

  	if (data.value != this.state.valueDropdown)
  	{
	  	window.location = "/projetos/" + data.value + "/tarefas";
  	}
  }

  async handleResponse(response) {
		let authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));

		// Preenche a lista de opcoes do dropdown com os projetos do usuario
		for (var i = 0; i < response.projetos.length; i++) {
			fetch(apiUrl + response.projetos[i], {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      	}
	    }).then(response => response.json())
	    .then(response => this.setState(prevState => ({
				  listaOpcoes: [...prevState.listaOpcoes, { "text": response.nome + " (" + response.id + ")", "value": "" + response.id}]
				})));
	    // IMPORTANTE: "value": "" + response.id Isso eh pra converter o id para string
		}

		// Pega os detalhes do projeto atual
		let responseProjeto;
		await fetch(apiUrl + /projetos/ + this.state.valueDropdown, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    })
		.then(response => response.json())
		.then(response => responseProjeto = response);


		for (var i = 0; i < responseProjeto.tarefas.length; i++) {
			// Pega os detalhes de cada tarefa e mostra na tela
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

