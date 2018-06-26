import React, { Component } from 'react'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarProjeto from './pagedraw/telaadicionarprojeto'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppCriarProjeto extends Component {
  render() {
    return (
      <TelaCriarProjeto handleClick={this.handleSubmit}
        nomeProjeto={this.state.nomeProjeto}
        descricao={this.state.descricao}
        idEquipes={this.state.idEquipes}
        prazo={this.state.prazo}
        setNomeProjeto={this.setNomeProjeto}
        setDescricao={this.setDescricao}
        setIdEquipes={this.setIdEquipes}
        setPrazo={this.setPrazo}
        nomeUsuario={this.state.nomeUsuario}
        corBotao={this.state.corBotao}
        mensagemErro={this.state.mensagemErro}
      />
    )
  }

  async handleSubmit() {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    if (this.state.corBotao === "rgba(17, 39, 73, 1)") {

      let response1 = await window.fetch(apiUrl + '/projetos/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic
        },
        body: JSON.stringify({
          nome: this.state.nomeProjeto,
          descricao: this.state.descricao,
          prazo: this.state.prazo
        })
      })

      if (response1.ok) {
        let responseJson = await response1.json()

        let response2 = await window.fetch(apiUrl + '/projetos/' + responseJson.id + '/equipes/', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic
          },
          body: JSON.stringify({
            equipes: this.state.idEquipes.split(/[ ,]/).filter(function (el) { return el.length !== 0 }).map(x => '/equipes/' + x)
          })
        })

        if (response2.ok) {
          window.location = '/projetos'
        } else {
          let responseErro = await response2.text();
          console.log(responseErro)
          this.setState({
            mensagemErro: responseErro
          })
          setTimeout(() => this.setState({ mensagemErro: '' }), 5000)
        }
      } else {
        let responseErro = await response1.text();
        console.log(responseErro)
        this.setState({
          mensagemErro: responseErro
        })
        setTimeout(() => this.setState({ mensagemErro: '' }), 5000)
      }
    }
  }

  setNomeProjeto(value) {
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
      nomeProjeto: value
    })
  }

  setDescricao(value) {
    if (this.state.nomeProjeto === '') {
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

  setIdEquipes(value) {
    if (this.state.nomeProjeto === '') {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 0.15)'
      })
    } else {
      this.setState({
        corBotao: 'rgba(17, 39, 73, 1)'
      })
    }
    this.setState({
      idEquipes: value
    })
  }

  setPrazo(value) {
    if (this.state.nomeProjeto === '') {
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

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setNomeProjeto = this.setNomeProjeto.bind(this)
    this.setDescricao = this.setDescricao.bind(this)
    this.setIdEquipes = this.setIdEquipes.bind(this)
    this.setPrazo = this.setPrazo.bind(this)

    this.state = {
      nomeUsuario: window.localStorage.getItem('usuarioADA'),
      nomeProjeto: '',
      descricao: '',
      idEquipes: '',
      prazo: '',
      corBotao: 'rgba(17, 39, 73, 0.15)'
    }
  }

  componentDidMount() {
  }
};
