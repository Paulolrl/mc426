import { Component } from 'react'
import FileSaver from 'file-saver'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppDownloadArquivo extends Component {
  render () {
    return null
  }

  async handleResponse () {
    window.location = '/diretorios/' + this.state.idDiretorio
  }

  constructor (props) {
    super(props)
    this.handleResponse = this.handleResponse.bind(this)

    this.state = {
      idDiretorio: '' + this.props.match.params.idDiretorio,
      idItem: '' + this.props.match.params.idItem
    }
  }
  async componentWillMount () {
    console.log(window.localStorage.getItem('usuarioADA'))
    var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    let responseArquivo = await window.fetch(apiUrl + '/diretorios/' + this.state.idDiretorio + '/itens/' + this.state.idItem, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())

    console.log(responseArquivo)

    await window.fetch(apiUrl + '/diretorios/' + this.state.idDiretorio + '/itens/' + this.state.idItem + '/download', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(function (response) {
      return response.blob()
    }).then(function (blob) {
      FileSaver.saveAs(blob, responseArquivo.nome)
    }).then(() => this.handleResponse())
  }
};
