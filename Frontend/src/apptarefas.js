import React, { Component } from 'react'

// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaTarefas from './pagedraw/telatarefas'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'semantic-ui-css/semantic.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppTarefas extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <TelaTarefas nomeUsuario={this.state.nomeUsuario}
          listaTarefas={this.state.listaTarefas}
          listaOpcoes={this.state.listaOpcoes}
          onChangeDropdown={this.onChangeDropdown}
          valueDropdown={this.state.valueDropdown}
        />
      </MuiThemeProvider>
    )
  }

  constructor (props) {
    super(props)

    this.state = {
      'nomeUsuario': window.localStorage.getItem('usuarioADA'),
      'listaTarefas': [],
      valueDropdown: '' + this.props.match.params.idProjeto,
      listaOpcoes: []
    }

    this.handleResponse = this.handleResponse.bind(this)
    this.toColor = this.toColor.bind(this)
    this.onChangeDropdown = this.onChangeDropdown.bind(this)
  }

  async onChangeDropdown (evt, data) {
    if (data.value !== this.state.valueDropdown) {
      window.location = '/projetos/' + data.value + '/tarefas'
    }
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
    let authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    // Preenche a lista de opcoes do dropdown com os projetos do usuario
    for (let i = 0; i < response.projetos.length; i++) {
      window.fetch(apiUrl + response.projetos[i], {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic
        }
      }).then(response => response.json())
        .then(response => this.setState(prevState => ({
          listaOpcoes: [...prevState.listaOpcoes, { 'text': response.nome + ' (' + response.id + ')', 'value': '' + response.id }]
        })))
      // IMPORTANTE: "value": "" + response.id Isso eh pra converter o id para string
    }

    // Pega os detalhes do projeto atual
    let responseProjeto = await window.fetch(apiUrl + /projetos/ + this.state.valueDropdown, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    })
      .then(response => response.json())

    for (let i = 0; i < responseProjeto.tarefas.length; i++) {
      // Pega os detalhes de cada tarefa e mostra na tela
      window.fetch(apiUrl + responseProjeto.tarefas[i], {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic,
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(response => this.setState(prevState => ({
          listaTarefas: [...prevState.listaTarefas, {
            'nomeTarefa': response.nome + ' (' + response.id + ')',
            'prazo': response.prazo,
            idTarefa: response.id,
            'corProgresso': this.toColor(response.progresso.porcentagem),
            'responsaveis': response.responsaveis.map(x => x.substring('/usuarios/'.length)).join(', ')
          }].sort((a, b) => (new Date(a.prazo) - new Date(b.prazo)))
        }))
        )
    }
  }

  componentDidMount () {
    console.log(window.localStorage.getItem('usuarioADA'))
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    console.log('GET ' + apiUrl + '/projetos')
    console.log(authorizationBasic)
    window.fetch(apiUrl + '/projetos', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())
      .then(response => this.handleResponse(response))
  }
};
