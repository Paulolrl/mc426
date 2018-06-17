import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaLogin from './pagedraw/tela_login'

export default class AppLogin extends Component {

  render() {
    return (
      <TelaLogin handleClick={this.handleLogin}
                 usuario={this.state.usuario}
                 senha={this.state.senha}
                 setUsuario={this.setUsuario}
                 setSenha={this.setSenha}
                 />
    );
  }

  handleLogin() {
    window.localStorage.setItem('usuarioADA', this.state.usuario);
    window.localStorage.setItem('senhaADA', this.state.senha);
    window.location = '/equipes';
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

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.setUsuario = this.setUsuario.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.state = {
      usuario: '',
      senha: ''
    };
  }

  componentDidMount() {
  }
};

