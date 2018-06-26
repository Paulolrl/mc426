import { Component } from 'react'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppDecideProjetoArquivo extends Component {
  render () {
    return null
  }

  async handleResponse (response) {
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    let responseProj = await window.fetch(apiUrl + response.projetos[0], {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())
    window.location = responseProj.diretorio
  }

  componentWillMount () {
    console.log(window.localStorage.getItem('usuarioADA'))
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    console.log('GET ' + apiUrl + '/projetos')
    console.log(authorizationBasic)
    window.fetch(apiUrl + '/projetos', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())
      .then(response => this.handleResponse(response))
  }
};
