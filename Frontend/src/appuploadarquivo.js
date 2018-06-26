import React, { Component } from 'react'
import axios, { post } from 'axios'

// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaUploadArquivo from './pagedraw/telauploadarquivo'

import 'semantic-ui-css/semantic.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppUploadArquivo extends Component {
  render() {
    return (
      <TelaUploadArquivo handleChange={this.handleChange}
        handleClick={this.handleClick}
        nomeUsuario={this.state.nomeUsuario}
        listaMinhasTarefas={this.state.listaMinhasTarefas} // BARRA LATERAL
      />
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      'nomeUsuario': window.localStorage.getItem('usuarioADA'),
      'arquivo': null,
      idDiretorio: this.props.match.params.idDiretorio,
      listaMinhasTarefas: [] // BARRA LATERAL
    }

    // BARRA LATERAL
    this.toColor = this.toColor.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  // BARRA LATERAL
  toColor(progresso) {
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


  async handleChange(fileList) {
    console.log(fileList)
    if (fileList.length > 0) {
      await this.setState({ arquivo: fileList[0] })
    } else {
      this.setState({ arquivo: null })
    }
  }

  async handleClick() {
    const url = apiUrl + '/diretorios/' + this.state.idDiretorio + '/upload'
    const formData = new FormData()
    formData.append('file', this.state.arquivo)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    post(url, formData, config)

    window.location = '/diretorios/' + this.state.idDiretorio
  }

  async componentDidMount() {
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
