import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarProjeto from './pagedraw/telaadicionarprojeto'

const apiUrl = 'http://localhost:8080/Backend/mc426';

export default class AppCriarProjeto extends Component {

  render() {
    return (
      <TelaCriarProjeto handleClick={this.handleSubmit}
      					nomeProjeto={this.state.nomeProjeto}
               			descricao={this.state.descricao}
                        idEquipes={this.state.idEquipes}
                        prazo={this.state.prazo}
               			setNomeProjeto={this.setNomeProjeto}
               			setDescricao={this.setDescricao}
                        setIdEquipes={this.setIdEquipes}
                        setPrazo={this.setPrazo}
               			nomeUsuario={this.state.nomeUsuario}
		/>
    );
  }

  handleSubmit() {


  }

  setNomeProjeto(value) {
    this.setState({
      nomeProjeto: value
    })
  }

  setDescricao(value) {
    this.setState({
      descricao: value
    })
  }

  setIdEquipes(value) {
    this.setState({
      idEquipes: value
    })
  }

  setPrazo(value) {
    this.setState({
      prazo: value
    })
  }

  constructor(props) {
	super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNomeProjeto = this.setNomeProjeto.bind(this);
    this.setDescricao = this.setDescricao.bind(this);
    this.setIdEquipes = this.setIdEquipes.bind(this);
    this.setPrazo = this.setPrazo.bind(this);

    this.state = {
    	"nomeUsuario": window.localStorage.getItem('usuarioADA'),
    	nomeProjeto: "",
    	descricao: "",
    	idEquipes: "",
        prazo: "",
        nomeUsuario: ""
    };
  }

  componentDidMount() {
  	console.log(window.localStorage.getItem('usuarioADA'));
  	this.setState({nomeUsuario: window.localStorage.getItem('usuarioADA')});
  }
};
