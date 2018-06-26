import React, { Component } from 'react'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaDetalheEquipe from './pagedraw/teladetalheequipe'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppDetalheEquipe extends Component {
  render() {
    return (
      <TelaDetalheEquipe handleClick={this.handleSubmit}
        nomeEquipe={this.state.nomeEquipe}
        membrosEquipe={this.state.membrosEquipe}
        setMembros={this.setMembros}
        nomeUsuario={this.state.nomeUsuario}
        corBotao={this.state.corBotao}
        mensagemErro={this.state.mensagemErro}
      />
    )
  }

  async handleSubmit() {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    if (this.state.corBotao === "rgba(17, 39, 73, 1)") {
      let response = await window.fetch(apiUrl + '/equipes/' + this.state.idEquipe, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic
        },
        body: JSON.stringify({
          membros: this.state.membrosEquipe.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/usuarios/' + x)
        })
      })

      if (response.ok){
        window.location = '/equipes'
      }else{
        let response2 = await response.text();
        this.setState({
          mensagemErro: response2
        })
        setTimeout(() => this.setState({ mensagemErro: '' }), 5000)
      }
    }
  }

  setMembros(value) {
    if (value === this.state.membrosEquipeInicial){
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    }else{
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
    this.setMembros = this.setMembros.bind(this)

    this.state = {
      nomeUsuario: window.localStorage.getItem('usuarioADA'),
      nomeEquipe: '',
      idEquipe: this.props.match.params.idEquipe,
      membrosEquipe: '',
      corBotao: 'rgba(17, 39, 73, 0.15)',
      membrosEquipeInicial: ''
    }
  }

  componentDidMount() {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    console.log(window.localStorage.getItem('usuarioADA'))

    window.fetch(apiUrl + /equipes/ + this.state.idEquipe, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => this.setState({
        'nomeEquipe': response.nome + ' (' + response.id + ')',
        'membrosEquipe': response.membros.map(x => x.substring('/usuarios/'.length)).join(', '),
        'membrosEquipeInicial': response.membros.map(x => x.substring('/usuarios/'.length)).join(', ')
      }))
  }
};
