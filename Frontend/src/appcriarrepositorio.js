import React, { Component } from 'react'

// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarRepositorio from './pagedraw/telacriarrepositorio'

import 'semantic-ui-css/semantic.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppCriarRepositorio extends Component {
  render () {
    return (
      <TelaCriarRepositorio setNome={this.setNome}
        nome={this.state.nome}
        link={this.state.link}
        setLink={this.setLink}
        handleClick={this.handleClick}
        nomeUsuario={this.state.nomeUsuario}
      />
    )
  }

  constructor (props) {
    super(props)

    this.state = {
      'nomeUsuario': window.localStorage.getItem('usuarioADA'),
      nome: '',
      idDiretorio: this.props.match.params.idDiretorio,
      link: ''
    }

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

  async handleClick () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    await window.fetch(apiUrl + '/diretorios/' + this.state.idDiretorio + '/repositorio', {
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

  componentDidMount () {

  }
};
