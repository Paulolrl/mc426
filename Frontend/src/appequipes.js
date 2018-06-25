import React, { Component } from 'react'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaEquipes from './pagedraw/telaequipes'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppEquipes extends Component {
  render () {
    return (
      <TelaEquipes nomeUsuario={this.state.nomeUsuario}
        listaEquipes1={this.state.listaEquipes1}
        listaEquipes2={this.state.listaEquipes2}
        listaEquipes3={this.state.listaEquipes3}
        listaTarefas={this.state.listaTarefas} />
    )
  }

  constructor (props) {
    super(props)

    this.state = {
      'nomeUsuario': window.localStorage.getItem('usuarioADA'),

      'listaEquipes1': [
      ],
      'listaEquipes2': [
      ],
      'listaEquipes3': [
      ],
      listaTarefas: []
    }

    this.handleResponse = this.handleResponse.bind(this)
    this.toColor = this.toColor.bind(this)
  }

  toColor (progresso) {
    progresso = parseInt(progresso)
    progresso = (30 + progresso) * (70 / 130.0)
    let r = Math.round(255.0 * Math.min(1, (100 - progresso) / 50.0)).toString(16)
    if (r.length === 1) { r = '0' + r }
    let g = Math.round(255.0 * Math.min(1, (progresso) / 50.0)).toString(16)
    if (g.length === 1) { g = '0' + g }
    let rgb = '#' + r + g + '00'

    console.log(rgb)
    return rgb
  }

  async handleResponse (response) {
    // CODIGO BARRA DE TAREFAS
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    for (let i = 0; i < response.tarefas.length; i++) {
      await window.fetch(apiUrl + response.tarefas[i], {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic,
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
        .then(resp => this.setState(prevState => ({
          listaTarefas: [...prevState.listaTarefas, { 'nomeTarefa': resp.nome + ' (' + resp.id + ')', 'resourceTarefa': response.tarefas[i], prazo: resp.prazo, descricao: resp.descricao, progresso: this.toColor(resp.progresso.porcentagem) }].sort((a, b) => (new Date(a.prazo) - new Date(b.prazo)))
        }))
        )
    }

    for (let i = 0; i < response.equipes.length; i++) {
      console.log(response)
      console.log(this)

      if (i % 3 === 0) {
        window.fetch(apiUrl + response.equipes[i], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({
            listaEquipes1: [...prevState.listaEquipes1, { 'nomeEquipe': response.nome + ' (' + response.id + ')', 'resourceEquipe': '/equipes/' + response.id }]
          }))
          )
      } else if (i % 3 === 1) {
        window.fetch(apiUrl + response.equipes[i], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({
            listaEquipes2: [...prevState.listaEquipes2, { 'nomeEquipe': response.nome + ' (' + response.id + ')', 'resourceEquipe': '/equipes/' + response.id }]
          }))
          )
      } else {
        window.fetch(apiUrl + response.equipes[i], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({
            listaEquipes3: [...prevState.listaEquipes3, { 'nomeEquipe': response.nome + ' (' + response.id + ')', 'resourceEquipe': '/equipes/' + response.id }]
          }))
          )
      }
    }
  }

  componentDidMount () {
    console.log(window.localStorage.getItem('usuarioADA'))

    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    console.log('GET ' + apiUrl + '/usuarios/' + this.state.nomeUsuario)
    console.log(authorizationBasic)
    window.fetch(apiUrl + '/usuarios/' + this.state.nomeUsuario, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())
      .then(response => this.handleResponse(response))
  }
};
