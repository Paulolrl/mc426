import React, { Component } from 'react'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaDetalheEquipe from './pagedraw/teladetalheequipe'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppDetalheEquipe extends Component {
  render () {
    return (
      <TelaDetalheEquipe handleClick={this.handleSubmit}
        nomeEquipe={this.state.nomeEquipe}
        membrosEquipe={this.state.membrosEquipe}
        setMembros={this.setMembros}
        nomeUsuario={this.state.nomeUsuario}
      />
    )
  }

  handleSubmit () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    window.fetch(apiUrl + '/equipes/' + this.state.idEquipe, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      },
      body: JSON.stringify({
        membros: this.state.membrosEquipe.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/usuarios/' + x)
      })
    })

    window.location = '/equipes'
  }

  setMembros (value) {
    this.setState({
      membrosEquipe: value
    })
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setMembros = this.setMembros.bind(this)

    this.state = {
      nomeUsuario: window.localStorage.getItem('usuarioADA'),
      nomeEquipe: '',
      idEquipe: this.props.match.params.idEquipe,
      membrosEquipe: ''
    }
  }

  componentDidMount () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    console.log(window.localStorage.getItem('usuarioADA'))

    window.fetch(apiUrl + /equipes/ + this.state.idEquipe, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => this.setState({ 'nomeEquipe': response.nome + ' (' + response.id + ')', 'membrosEquipe': response.membros.map(x => x.substring('/usuarios/'.length)) }))
  }
};
