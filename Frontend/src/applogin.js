import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaLogin from './pagedraw/tela_login'

const apiUrl = 'http://localhost:8080/Backend/mc426';

export default class AppLogin extends Component {

  render() {
    return (
      <TelaLogin handleClick={this.handleLogin}
                 usuario={this.state.usuario}
                 senha={this.state.senha}
                 setUsuario={this.setUsuario}
                 setSenha={this.setSenha}
                 fonteErro={this.state.fonteErro}
                 usuarioCadastro={this.state.usuarioCadastro}
                 nomeCadastro={this.state.nomeCadastro}
                 senhaCadastro={this.state.senhaCadastro}
                 boolGerente={this.state.boolGerente}
                 handleClickCadastro={this.handleCadastro}
                 setNomeCadastro={this.setNomeCadastro}
                 setUsuarioCadastro={this.setUsuarioCadastro}
                 setSenhaCadastro={this.setSenhaCadastro}
                 setBoolGerente={this.setBoolGerente}

                 />
    );
  }


  async handleLogin() {
    let response = await fetch(apiUrl + "/usuarios/" + this.state.usuario, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.state.usuario + ':' + this.state.senha)
            }
        });
    if (response.ok)
    {
      window.localStorage.setItem('usuarioADA', this.state.usuario);
      window.localStorage.setItem('senhaADA', this.state.senha);
      window.location = '/equipes';
    }
    else
    {
      this.setState({fonteErro: 18});
      setTimeout(() => this.setState({fonteErro: 0}), 2000);
    }
  }

  setUsuario(value) {
    this.setState({
      usuario: value
    })
  }

  setSenha(value) {
    this.setState({
      senha: value
    })
  }

  setNomeCadastro(value) {
    this.setState({
      nomeCadastro: value
    })
  }

  setUsuarioCadastro(value) {
    this.setState({
      usuarioCadastro: value
    })
  }

  setSenhaCadastro(value) {
    this.setState({
      senhaCadastro: value
    })
  }

  setBoolGerente(value) {
    this.setState({
      boolGerente: !this.state.boolGerente
    })
  }


  async handleCadastro() {
    let response = await fetch(apiUrl + "/usuarios", {
            method: 'POST',
            body: JSON.stringify({
              "nome": this.state.nomeCadastro,
              "usuario": this.state.usuarioCadastro,
              "senha": this.state.senhaCadastro,
              "gerente": this.state.boolGerente
            })
        });
    console.log(this.state.boolGerente);
    if (response.ok)
    {
      window.localStorage.setItem('usuarioADA', this.state.usuarioCadastro);
      window.localStorage.setItem('senhaADA', this.state.senhaCadastro);
      window.location = '/equipes';
    }
    else
    {
      console.log("Cadastro deu errado.");
    }
  }

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.setUsuario = this.setUsuario.bind(this);
    this.setSenha = this.setSenha.bind(this);

    this.handleCadastro = this.handleCadastro.bind(this);
    this.setNomeCadastro = this.setNomeCadastro.bind(this);
    this.setUsuarioCadastro = this.setUsuarioCadastro.bind(this);
    this.setSenhaCadastro = this.setSenhaCadastro.bind(this);
    this.setBoolGerente = this.setBoolGerente.bind(this);
    this.state = {
      usuario: '',
      senha: '',
      fonteErro: 0,
      usuarioCadastro: "",
      nomeCadastro: "",
      senhaCadastro: "",
      boolGerente: false
    };
  }

  componentDidMount() {
  }
};

