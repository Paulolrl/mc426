import React, { Component } from 'react'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarProjeto from './pagedraw/telaadicionarprojeto'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppCriarProjeto extends Component {
  render () {
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
        listaMinhasTarefas={this.state.listaMinhasTarefas} // BARRA LATERAL
        mensagemErro={this.state.mensagemErro}
      />
    )
  }

  async handleSubmit () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    if (this.state.corBotao === 'rgba(17, 39, 73, 1)') {
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
          let responseErro = await response2.text()
          this.setState({
            mensagemErro: responseErro
          })
          setTimeout(() => this.setState({ mensagemErro: '' }), 5000)
        }
      } else {
        let responseErro = await response1.text()
        console.log(responseErro)
        this.setState({
          mensagemErro: responseErro
        })
        setTimeout(() => this.setState({ mensagemErro: '' }), 5000)
      }
    }
  }

  setNomeProjeto (value) {
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

  setDescricao (value) {
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

  setIdEquipes (value) {
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

  setPrazo (value) {
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

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setNomeProjeto = this.setNomeProjeto.bind(this)
    this.setDescricao = this.setDescricao.bind(this)
    this.setIdEquipes = this.setIdEquipes.bind(this)
    this.setPrazo = this.setPrazo.bind(this)
    // BARRA LATERAL
    this.toColor = this.toColor.bind(this)

    this.state = {
      nomeUsuario: window.localStorage.getItem('usuarioADA'),
      nomeProjeto: '',
      descricao: '',
      idEquipes: '',
      prazo: '',
      corBotao: 'rgba(17, 39, 73, 0.15)',
      listaMinhasTarefas: [] // BARRA LATERAL
    }
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
