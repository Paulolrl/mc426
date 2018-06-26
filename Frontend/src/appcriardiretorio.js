import React, { Component } from 'react'

// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarDiretorio from './pagedraw/telacriardiretorio'

import 'semantic-ui-css/semantic.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppCriarDiretorio extends Component {
  render () {
    return (
      <TelaCriarDiretorio setNome={this.setNome}
        nome={this.state.nome}
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
      idDiretorio: this.props.match.params.idDiretorio
    }

    this.setNome = this.setNome.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  setNome (value) {
    this.setState({
      nome: value
    })
  }

  async handleClick () {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    await window.fetch(apiUrl + '/diretorios/' + this.state.idDiretorio + '/subdiretorio', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      },
      body: JSON.stringify({
        nome: this.state.nome
      })
    })
    window.location = '/diretorios/' + this.state.idDiretorio
  }

  componentDidMount () {

  }
};
