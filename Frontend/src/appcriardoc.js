import React, { Component } from 'react'

// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarDoc from './pagedraw/telacriardoc'

import 'semantic-ui-css/semantic.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppCriarDoc extends Component {
  render () {
    return (
      <TelaCriarDoc setNome={this.setNome}
        nome={this.state.nome}
        link={this.state.link}
        setLink={this.setLink}
        handleClick={this.handleClick}
        nomeUsuario={this.state.nomeUsuario}
        listaMinhasTarefas={this.state.listaMinhasTarefas} // BARRA LATERAL
      />
    )
  }

  constructor (props) {
    super(props)

    this.state = {
      'nomeUsuario': window.localStorage.getItem('usuarioADA'),
      nome: '',
      idDiretorio: this.props.match.params.idDiretorio,
      link: '',
      listaMinhasTarefas: [] // BARRA LATERAL
    }

    // BARRA LATERAL
    this.toColor = this.toColor.bind(this)
    this.setNome = this.setNome.bind(this)
    this.setLink = this.setLink.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  setNome (value) {
    this.setState({
      nome: value
    })
  }

  setLink (value) {
    this.setState({
      link: value
    })
  }
  // BARRA LATERAL
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

  async handleClick () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    await window.fetch(apiUrl + '/diretorios/' + this.state.idDiretorio + '/documento', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      },
      body: JSON.stringify({
        nome: this.state.nome,
        link: this.state.link,
        chaveAutenticacao: ''
      })
    })

    window.location = '/diretorios/' + this.state.idDiretorio
  }

  async componentDidMount () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    // CODIGO BARRA LATERAL
    let responseTarefas = await window.fetch(apiUrl + '/usuarios/' + this.state.nomeUsuario, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())

    for (let i = 0; i < responseTarefas.tarefas.length; i++) {
      await window.fetch(apiUrl + responseTarefas.tarefas[i], {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic,
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
        .then(resp => this.setState(prevState => ({
          listaMinhasTarefas: [...prevState.listaMinhasTarefas, { 'nomeTarefa': resp.nome + ' (' + resp.id + ')', 'resourceTarefa': responseTarefas.tarefas[i], prazo: resp.prazo, descricao: resp.descricao, progresso: this.toColor(resp.progresso.porcentagem) }].sort((a, b) => (new Date(a.prazo) - new Date(b.prazo)))
        }))
        )
    }
  }
};
