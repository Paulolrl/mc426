import React, { Component } from 'react'
import axios, { post } from 'axios'

// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaUploadArquivo from './pagedraw/telauploadarquivo'

import 'semantic-ui-css/semantic.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppUploadArquivo extends Component {
  render () {
    return (
      <TelaUploadArquivo handleChange={this.handleChange}
        handleClick={this.handleClick}
      />
    )
  }

  constructor (props) {
    super(props)

    this.state = {
      'nomeUsuario': window.localStorage.getItem('usuarioADA'),
      'arquivo': null,
      idDiretorio: this.props.match.params.idDiretorio
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleChange (fileList) {
    console.log(fileList)
    if (fileList.length > 0) {
      await this.setState({arquivo: fileList[0]})
    } else {
      this.setState({arquivo: null})
    }
  }

  async handleClick () {
    const url = apiUrl + '/diretorios/' + this.state.idDiretorio + '/upload'
    const formData = new FormData()
    formData.append('file', this.state.arquivo)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }

  componentDidMount () {

  }
};
