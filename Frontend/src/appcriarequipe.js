import React, { Component } from 'react'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarEquipes from './pagedraw/telacriarequipe'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppCriarEquipe extends Component {
  render() {
    return (
      <TelaCriarEquipes handleClick={this.handleSubmit}
        nomeEquipe={this.state.nomeEquipe}
        membrosEquipe={this.state.membrosEquipe}
        setMembros={this.setMembros}
        setNome={this.setNome}
        nomeUsuario={this.state.nomeUsuario}
        corBotao={this.state.corBotao}
        mensagemErro={this.state.mensagemErro}
      />
    )
  }

  async handleSubmit() {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    if (this.state.corBotao === "rgba(17, 39, 73, 1)") {
      let response = await window.fetch(apiUrl + '/equipes', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic
        },
        body: JSON.stringify({
          nome: this.state.nomeEquipe,
          membros: this.state.membrosEquipe.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/usuarios/' + x)
        })
      })

      if(response.ok){
        console.log('POST ' + apiUrl + '/equipes')
        window.location = '/equipes';
      }else{
        let response2 = await response.text();
        this.setState({
          mensagemErro: response2
        })
        setTimeout(() => this.setState({ mensagemErro: '' }), 5000)
      }
    }
  }

  setNome(value) {
    if (value === '') {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      nomeEquipe: value
    })
  }

  setMembros(value) {
    if (this.state.nomeEquipe === '') {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      membrosEquipe: value
    })
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setNome = this.setNome.bind(this)
    this.setMembros = this.setMembros.bind(this)

    this.state = {
      'nomeUsuario': window.localStorage.getItem('usuarioADA'),
      nomeEquipe: '',
      membrosEquipe: '',
      corBotao: 'rgba(17, 39, 73, 0.15)'
    }
  }

  componentDidMount() {
  }
};
