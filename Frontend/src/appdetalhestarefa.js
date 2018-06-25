import React, { Component } from 'react'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaDetalhesTarefa from './pagedraw/teladetalhestarefa'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppDetalhesTarefa extends Component {
  render () {
    return (
      <TelaDetalhesTarefa
        nomeUsuario={this.state.nomeUsuario}
        listaFeedbacks={this.state.listaFeedbacks}
        corProgresso={this.state.corProgresso}
        prazo={this.state.prazo}
        responsaveis={this.state.responsaveis}
        descricaoProgresso={this.state.descricaoProgresso}
        numeroProgresso={this.state.numeroProgresso}
        nomeTarefa={this.state.nomeTarefa}
        feedbackInput={this.state.feedbackInput}
        ratingInput={this.state.ratingInput}
        dependencias={this.state.dependencias}
        tags={this.state.tags}
        duracao={this.state.duracao}
        setPrazo={this.setPrazo}
        setResponsaveis={this.setResponsaveis}
        setDuracao={this.setDuracao}
        setTags={this.setTags}
        setDependecias={this.setDependecias}
        setProgresso={this.setProgresso}
        setDescricao={this.setDescricao}
        setNovoFeedback={this.setNovoFeedback}
        setNovoRating={this.setNovoRating}
        handleClickSalvar={this.handleClickSalvar}
        handleClickEnviar={this.handleClickEnviar}
      />
    )
  }

  setPrazo (value) {
    this.setState({
      prazo: value
    })
  }

  setResponsaveis (value) {
    this.setState({
      responsaveis: value
    })
  }

  setDuracao (value) {
    this.setState({
      duracao: value
    })
  }

  setTags (value) {
    this.setState({
      tags: value
    })
  }
  setDependecias (value) {
    this.setState({
      dependencias: value
    })
  }
  setProgresso (value) {
    this.setState({
      numeroProgresso: value,
      corProgresso: this.toColor(value)
    })
  }
  setDescricao (value) {
    this.setState({
      descricaoProgresso: value
    })
  }

  setNovoRating (value) {
    this.setState({
      ratingInput: value
    })
  }

  setNovoFeedback (value) {
    this.setState({
      feedbackInput: value
    })
  }

  async handleClickSalvar () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    await window.fetch(apiUrl + '/projetos/' + this.state.idProjeto + '/tarefas/' + this.state.idTarefa, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      },
      body: JSON.stringify({
        nome: this.state.nomeTarefa,
        descricao: this.state.descricaoTarefa, // TODO
        prazo: this.state.prazo,
        tags: this.state.tags.split(/[ ,]/).filter(function (el) { return el.length !== 0 }),
        responsaveis: this.state.responsaveis.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/usuarios/' + x),
        dependencias: [], // TODO
        progresso: {
          texto: this.state.descricaoProgresso, // TODO back
          porcentagem: this.state.numeroProgresso
        }
      })
    })

    window.location = '/projetos/' + this.state.idProjeto + '/tarefas'
  }

  async handleClickEnviar () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    await window.fetch(apiUrl + '/projetos/' + this.state.idProjeto + '/tarefas/' + this.state.idTarefa + '/feedbacks', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      },
      body: JSON.stringify({
        'autor': '/usuarios/' + window.localStorage.getItem('usuarioADA'),
        'comentario': this.state.feedbackInput,
        'nota': this.state.ratingInput
      })
    })

    this.setState({feedbackInput: '', ratingInput: ''})

    await window.fetch(apiUrl + '/projetos/' + this.state.idProjeto + '/tarefas/' + this.state.idTarefa, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => this.setState({
        listaFeedbacks: response.feedbacks.map(x => ({ autor: x.autor.substring('/usuarios/'.length), comentario: x.comentario, nota: x.nota }))
      })
      )
  }

  constructor (props) {
    super(props)
    this.toColor = this.toColor.bind(this)
    this.setPrazo = this.setPrazo.bind(this)
    this.setResponsaveis = this.setResponsaveis.bind(this)
    this.setDuracao = this.setDuracao.bind(this)
    this.setTags = this.setTags.bind(this)
    this.setDependecias = this.setDependecias.bind(this)
    this.setProgresso = this.setProgresso.bind(this)
    this.setDescricao = this.setDescricao.bind(this)
    this.setNovoFeedback = this.setNovoFeedback.bind(this)
    this.setNovoRating = this.setNovoRating.bind(this)
    this.handleClickSalvar = this.handleClickSalvar.bind(this)
    this.handleClickEnviar = this.handleClickEnviar.bind(this)
    this.state = {
      nomeUsuario: window.localStorage.getItem('usuarioADA'),
      idProjeto: this.props.match.params.idProjeto,
      idTarefa: this.props.match.params.idTarefa,
      listaFeedbacks: [],
      'corProgresso': '#ffffff',
      'prazo': '',
      'responsaveis': '',
      'duracao': '',
      'tags': '',
      'dependencias': '',
      'ratingInput': '',
      'feedbackInput': '',
      'nomeTarefa': '',
      'numeroProgresso': 0,
      'descricaoProgresso': '',
      descricaoTarefa: ''
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

  componentDidMount () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    window.fetch(apiUrl + '/projetos/' + this.state.idProjeto + '/tarefas/' + this.state.idTarefa, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => this.setState({
        'nomeTarefa': response.nome,
        'prazo': response.prazo,
        descricaoTarefa: response.descricao,
        idTarefa: response.id,
        listaFeedbacks: response.feedbacks.map(x => ({ autor: x.autor.substring('/usuarios/'.length), comentario: x.comentario, nota: x.nota })),
        numeroProgresso: response.progresso.porcentagem,
        descricaoProgresso: response.progresso.texto,
        dependencias: response.dependencias,
        tags: response.tags.join(', '),
        'corProgresso': this.toColor(response.progresso.porcentagem),
        'responsaveis': response.responsaveis.map(x => x.substring('/usuarios/'.length)).join(', ')
      })
      )
  }
};
