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
        descricaoTarefa={this.state.descricaoTarefa}
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
        setDescricaoTarefa={this.setDescricaoTarefa}
        handleClickSalvar={this.handleClickSalvar}
        handleClickEnviar={this.handleClickEnviar}
        corBotao={this.state.corBotao}
        mensagemErro={this.state.mensagemErro}
        listaMinhasTarefas={this.state.listaMinhasTarefas} // BARRA LATERAL
      />
    )
  }

  setPrazo (value) {
    if (this.state.descricaoTarefa === this.state.descricaoTarefaInicial &&
      value === this.state.prazoInicial &&
      this.state.responsaveis === this.state.responsaveisInicial &&
      this.state.tags === this.state.tagsInicial &&
      this.state.dependencias === this.state.dependenciasInicial &&
      this.state.numeroProgresso === this.state.numeroProgressoInicial &&
      this.state.descricaoProgresso === this.state.descricaoProgressoInicial) {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      prazo: value
    })
  }

  setResponsaveis (value) {
    if (this.state.descricaoTarefa === this.state.descricaoTarefaInicial &&
      this.state.prazo === this.state.prazoInicial &&
      value === this.state.responsaveisInicial &&
      this.state.tags === this.state.tagsInicial &&
      this.state.dependencias === this.state.dependenciasInicial &&
      this.state.numeroProgresso === this.state.numeroProgressoInicial &&
      this.state.descricaoProgresso === this.state.descricaoProgressoInicial) {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
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
    if (this.state.descricaoTarefa === this.state.descricaoTarefaInicial &&
      this.state.prazo === this.state.prazoInicial &&
      this.state.responsaveis === this.state.responsaveisInicial &&
      value === this.state.tagsInicial &&
      this.state.dependencias === this.state.dependenciasInicial &&
      this.state.numeroProgresso === this.state.numeroProgressoInicial &&
      this.state.descricaoProgresso === this.state.descricaoProgressoInicial) {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      tags: value
    })
  }
  setDependecias (value) {
    if (this.state.descricaoTarefa === this.state.descricaoTarefaInicial &&
      this.state.prazo === this.state.prazoInicial &&
      this.state.responsaveis === this.state.responsaveisInicial &&
      this.state.tags === this.state.tagsInicial &&
      value === this.state.dependenciasInicial &&
      this.state.numeroProgresso === this.state.numeroProgressoInicial &&
      this.state.descricaoProgresso === this.state.descricaoProgressoInicial) {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      dependencias: value
    })
  }
  setProgresso (value) {
    if (this.state.descricaoTarefa === this.state.descricaoTarefaInicial &&
      this.state.prazo === this.state.prazoInicial &&
      this.state.responsaveis === this.state.responsaveisInicial &&
      this.state.tags === this.state.tagsInicial &&
      this.state.dependencias === this.state.dependenciasInicial &&
      value === this.state.numeroProgressoInicial &&
      this.state.descricaoProgresso === this.state.descricaoProgressoInicial) {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      numeroProgresso: value,
      corProgresso: this.toColor(value)
    })
  }
  setDescricao (value) {
    if (this.state.descricaoTarefa === this.state.descricaoTarefaInicial &&
      this.state.prazo === this.state.prazoInicial &&
      this.state.responsaveis === this.state.responsaveisInicial &&
      this.state.tags === this.state.tagsInicial &&
      this.state.dependencias === this.state.dependenciasInicial &&
      this.state.numeroProgresso === this.state.numeroProgressoInicial &&
      value === this.state.descricaoProgressoInicial) {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      descricaoProgresso: value
    })
  }

  setDescricaoTarefa (value) {
    if (value === this.state.descricaoTarefaInicial &&
      this.state.prazo === this.state.prazoInicial &&
      this.state.responsaveis === this.state.responsaveisInicial &&
      this.state.tags === this.state.tagsInicial &&
      this.state.dependencias === this.state.dependenciasInicial &&
      this.state.numeroProgresso === this.state.numeroProgressoInicial &&
      this.state.descricaoProgresso === this.state.descricaoProgressoInicial) {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      descricaoTarefa: value
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

    if (this.state.corBotao === 'rgba(17, 39, 73, 1)') {
      let response = await window.fetch(apiUrl + '/projetos/' + this.state.idProjeto + '/tarefas/' + this.state.idTarefa, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic
        },
        body: JSON.stringify({
          nome: this.state.nomeTarefa,
          descricao: this.state.descricaoTarefa,
          prazo: this.state.prazo,
          tags: this.state.tags.split(/[ ,]/).filter(function (el) { return el.length !== 0 }),
          responsaveis: this.state.responsaveis.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/usuarios/' + x),
          dependencias: this.state.dependencias.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/projetos/' + this.state.idProjeto + '/tarefas/' + x),
          progresso: {
            texto: this.state.descricaoProgresso,
            porcentagem: this.state.numeroProgresso
          }
        })
      })
      if (response.ok) {
        window.location = '/projetos/' + this.state.idProjeto + '/tarefas'
      } else {
        let responseErro = await response.text()
        console.log(responseErro)
        this.setState({
          mensagemErro: responseErro
        })
        setTimeout(() => this.setState({ mensagemErro: '' }), 5000)
      }
    }
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

    this.setState({ feedbackInput: '', ratingInput: '' })

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
    this.setDescricaoTarefa = this.setDescricaoTarefa.bind(this)
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
      listaMinhasTarefas: [], // BARRA LATERAL
      'tags': '',
      'dependencias': '',
      'ratingInput': '',
      'feedbackInput': '',
      'nomeTarefa': '',
      'numeroProgresso': 0,
      'descricaoProgresso': '',
      descricaoTarefa: '',
      corBotao: 'rgba(17, 39, 73, 0.15)',
      prazoInicial: '',
      'responsaveisInicial': '',
      'tagsInicial': '',
      'dependenciasInicial': '',
      'numeroProgressoInicial': 0,
      'descricaoProgressoInicial': '',
      descricaoTarefaInicial: ''
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

  async componentDidMount () {
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
        'prazoInicial': response.prazo,
        descricaoTarefa: response.descricao,
        descricaoTarefaInicial: response.descricao,
        idTarefa: response.id,
        listaFeedbacks: response.feedbacks.map(x => ({ autor: x.autor.substring('/usuarios/'.length), comentario: x.comentario, nota: x.nota })),
        numeroProgresso: response.progresso.porcentagem,
        numeroProgressoInicial: response.progresso.porcentagem,
        descricaoProgresso: response.progresso.texto,
        descricaoProgressoInicial: response.progresso.texto,
        dependencias: response.dependencias.map(x => x.substring(('/projetos/' + this.state.idProjeto + '/tarefas/').length)).join(', '),
        dependenciasInicial: response.dependencias.map(x => x.substring(('/projetos/' + this.state.idProjeto + '/tarefas/').length)).join(', '),
        tags: response.tags.join(', '),
        tagsInicial: response.tags.join(', '),
        'corProgresso': this.toColor(response.progresso.porcentagem),
        'responsaveis': response.responsaveis.map(x => x.substring('/usuarios/'.length)).join(', '),
        'responsaveisInicial': response.responsaveis.map(x => x.substring('/usuarios/'.length)).join(', ')
      })
      )
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
