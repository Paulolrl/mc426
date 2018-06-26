import React, { Component } from 'react'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarTarefa from './pagedraw/telacriartarefa'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppCriarTarefa extends Component {
  render() {
    return (
      <TelaCriarTarefa handleClick={this.handleSubmit}
        nomeTarefa={this.state.nomeTarefa}
        descricao={this.state.descricao}
        tags={this.state.tags}
        responsaveis={this.state.responsaveis}
        data={this.state.data}
        setNomeTarefa={this.setNomeTarefa}
        setTags={this.setTags}
        setDescricao={this.setDescricao}
        setResponsaveis={this.setResponsaveis}
        setPrazo={this.setPrazo}
        nomeUsuario={this.state.nomeUsuario}
        setDependencias={this.setDependencias}
        corBotao={this.state.corBotao}
        mensagemErro={this.state.mensagemErro}
      />
    )
  }

  async handleSubmit() {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    if (this.state.corBotao === "rgba(17, 39, 73, 1)") {
      let response = await window.fetch(apiUrl + '/projetos/' + this.state.idProjeto + '/tarefas/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: this.state.nomeTarefa,
          descricao: this.state.descricao,
          prazo: this.state.data,
          responsaveis: this.state.responsaveis.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/usuarios/' + x),
          dependencias: this.state.dependencias.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/projetos/' + this.state.idProjeto + '/tarefas/' + x),
          tags: this.state.tags.split(/[ ,]/).filter(function (el) { return el.length !== 0 }),
          arquivos: []
        })
      })
      if (response.ok) {
        window.location = '/tarefas'
      }else{
        let response2 = await response.text();
        this.setState({
          mensagemErro: response2
        })
        setTimeout(() => this.setState({ mensagemErro: '' }), 5000)
      }
    }
  }

  setNomeTarefa(value) {
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
      nomeTarefa: value
    })
  }

  setDescricao(value) {
    if (this.state.nomeTarefa === '') {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      descricao: value
    })
  }

  setTags(value) {
    if (this.state.nomeTarefa === '') {
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

  setResponsaveis(value) {
    if (this.state.nomeTarefa === '') {
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

  setPrazo(value) {
    if (this.state.nomeTarefa === '') {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      data: value
    })
  }

  setDependencias(value) {
    if (this.state.nomeTarefa === '') {
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

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setNomeTarefa = this.setNomeTarefa.bind(this)
    this.setDescricao = this.setDescricao.bind(this)
    this.setTags = this.setTags.bind(this)
    this.setResponsaveis = this.setResponsaveis.bind(this)
    this.setPrazo = this.setPrazo.bind(this)
    this.setDependencias = this.setDependencias.bind(this)

    this.state = {
      nomeUsuario: window.localStorage.getItem('usuarioADA'),
      nomeTarefa: '',
      descricao: '',
      tags: '',
      responsaveis: '',
      data: '',
      dependencias: '',
      idProjeto: '' + this.props.match.params.idProjeto,
      corBotao: 'rgba(17, 39, 73, 0.15)'
    }
  }

  componentDidMount() {
  }
};
