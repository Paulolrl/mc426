import React, { Component } from 'react'

// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaDiretorio from './pagedraw/teladiretorio'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'semantic-ui-css/semantic.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const apiUrl = 'http://localhost:8080/Backend/mc426'

export default class AppTarefas extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <TelaDiretorio nomeUsuario={this.state.nomeUsuario}
          dados={this.state.dados}
        />
      </MuiThemeProvider>
    )
  }

  constructor (props) {
    super(props)
    this.handleResponse = this.handleResponse.bind(this)
    this.onChangeDropdown = this.onChangeDropdown.bind(this)
    this.onSelectOption = this.onSelectOption.bind(this)
    this.handleDirResponse = this.handleDirResponse.bind(this)

    this.state = {
      'dados': {
        'lista1': [],
        'lista2': [],
        'listaOpcoes': [],
        'onChangeDropdown': this.onChangeDropdown,
        valueDropdown: '',
        'lista3': [],
        'lista4': [],
        'onSelectOption': this.onSelectOption
      },
      idDiretorio: '' + this.props.match.params.idDiretorio,
      'nomeUsuario': window.localStorage.getItem('usuarioADA')
    }
  }

  async onSelectOption (evt, data) {
    window.location += '/' + data.value
  }

  async onChangeDropdown (evt, data) {
    let authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    if (data.value !== this.state.dados.valueDropdown) {
      let responseProjeto = await window.fetch(apiUrl + /projetos/ + data.value, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic
        }
      }).then(response => response.json())

      window.location = responseProjeto.diretorio
    }
  }

  async handleDirResponse (response) {
    let authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))
    let i = 0

    for (; i < response.subdiretorios.length; i++) {
      console.log(response.subdiretorios[i])

      if (i % 4 === 0) {
        window.fetch(apiUrl + response.subdiretorios[i], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({ dados: {
            'lista1': [...prevState.dados.lista1, {
              'nome': response.nome,
              'resource': '/diretorios/' + response.id,
              'icone': 'http://pngimg.com/uploads/folder/folder_PNG8773.png'
            }],
            'lista2': prevState.dados.lista2,
            'onChangeDropdown': prevState.dados.onChangeDropdown,
            valueDropdown: prevState.dados.valueDropdown,
            'lista3': prevState.dados.lista3,
            'lista4': prevState.dados.lista4,
            'onSelectOption': prevState.dados.onSelectOption,
            listaOpcoes: prevState.dados.listaOpcoes
          }
          })))
      }

      if (i % 4 === 1) {
        window.fetch(apiUrl + response.subdiretorios[i], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({ dados: {
            'lista2': [...prevState.dados.lista2, {
              'nome': response.nome,
              'resource': '/diretorios/' + response.id,
              'icone': 'http://pngimg.com/uploads/folder/folder_PNG8773.png'
            }],
            'lista1': prevState.dados.lista1,
            'onChangeDropdown': prevState.dados.onChangeDropdown,
            valueDropdown: prevState.dados.valueDropdown,
            'lista3': prevState.dados.lista3,
            'lista4': prevState.dados.lista4,
            'onSelectOption': prevState.dados.onSelectOption,
            listaOpcoes: prevState.dados.listaOpcoes
          }
          })))
      }

      if (i % 4 === 2) {
        window.fetch(apiUrl + response.subdiretorios[i], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({ dados: {
            'lista3': [...prevState.dados.lista3, {
              'nome': response.nome,
              'resource': '/diretorios/' + response.id,
              'icone': 'http://pngimg.com/uploads/folder/folder_PNG8773.png'
            }],
            'lista2': prevState.dados.lista2,
            'onChangeDropdown': prevState.dados.onChangeDropdown,
            valueDropdown: prevState.dados.valueDropdown,
            'lista1': prevState.dados.lista1,
            'lista4': prevState.dados.lista4,
            'onSelectOption': prevState.dados.onSelectOption,
            listaOpcoes: prevState.dados.listaOpcoes
          }
          })))
      }

      if (i % 4 === 3) {
        window.fetch(apiUrl + response.subdiretorios[i], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({ dados: {
            'lista4': [...prevState.dados.lista4, {
              'nome': response.nome,
              'resource': '/diretorios/' + response.id,
              'icone': 'http://pngimg.com/uploads/folder/folder_PNG8773.png'
            }],
            'lista2': prevState.dados.lista2,
            'onChangeDropdown': prevState.dados.onChangeDropdown,
            valueDropdown: prevState.dados.valueDropdown,
            'lista1': prevState.dados.lista1,
            'lista3': prevState.dados.lista3,
            'onSelectOption': prevState.dados.onSelectOption,
            listaOpcoes: prevState.dados.listaOpcoes
          }
          })))
      }
    }

    for (let j = 0; j < response.itens.length; i++, j++) {
      if (i % 4 === 0) {
        window.fetch(apiUrl + response.itens[j], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({ dados: {
            'lista1': [...prevState.dados.lista1, {
              'nome': response.nome,
              'resource': (response.tipo === 'arquivo') ? (window.location.toString() + '/itens/' + response.id + '/download') : response.link,
              'icone': (response.tipo === 'repositorio') ? 'https://image.flaticon.com/icons/svg/25/25231.svg' : (response.tipo === 'documentoGoogle' ? 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google-Docs-logo-transparent.max-300x300.png' : 'http://www.iconhot.com/icon/png/devine-icons-part-2/512/defult-text.png')
            }],
            'lista2': prevState.dados.lista2,
            'onChangeDropdown': prevState.dados.onChangeDropdown,
            valueDropdown: prevState.dados.valueDropdown,
            'lista3': prevState.dados.lista3,
            'lista4': prevState.dados.lista4,
            'onSelectOption': prevState.dados.onSelectOption,
            listaOpcoes: prevState.dados.listaOpcoes
          }
          })))
      }

      if (i % 4 === 1) {
        window.fetch(apiUrl + response.itens[j], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({ dados: {
            'lista2': [...prevState.dados.lista2, {
              'nome': response.nome,
              'resource': (response.tipo === 'arquivo') ? (window.location.toString() + '/itens/' + response.id + '/download') : response.link,
              'icone': (response.tipo === 'repositorio') ? 'https://image.flaticon.com/icons/svg/25/25231.svg' : (response.tipo === 'documentoGoogle' ? 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google-Docs-logo-transparent.max-300x300.png' : 'http://www.iconhot.com/icon/png/devine-icons-part-2/512/defult-text.png')
            }],
            'lista1': prevState.dados.lista1,
            'onChangeDropdown': prevState.dados.onChangeDropdown,
            valueDropdown: prevState.dados.valueDropdown,
            'lista3': prevState.dados.lista3,
            'lista4': prevState.dados.lista4,
            'onSelectOption': prevState.dados.onSelectOption,
            listaOpcoes: prevState.dados.listaOpcoes
          }
          })))
      }

      if (i % 4 === 2) {
        window.fetch(apiUrl + response.itens[j], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({ dados: {
            'lista3': [...prevState.dados.lista3, {
              'nome': response.nome,
              'resource': (response.tipo === 'arquivo') ? (window.location.toString() + '/itens/' + response.id + '/download') : response.link,
              'icone': (response.tipo === 'repositorio') ? 'https://image.flaticon.com/icons/svg/25/25231.svg' : (response.tipo === 'documentoGoogle' ? 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google-Docs-logo-transparent.max-300x300.png' : 'http://www.iconhot.com/icon/png/devine-icons-part-2/512/defult-text.png')
            }],
            'lista2': prevState.dados.lista2,
            'onChangeDropdown': prevState.dados.onChangeDropdown,
            valueDropdown: prevState.dados.valueDropdown,
            'lista1': prevState.dados.lista1,
            'lista4': prevState.dados.lista4,
            'onSelectOption': prevState.dados.onSelectOption,
            listaOpcoes: prevState.dados.listaOpcoes
          }
          })))
      }

      if (i % 4 === 3) {
        window.fetch(apiUrl + response.itens[j], {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(response => this.setState(prevState => ({ dados: {
            'lista4': [...prevState.dados.lista4, {
              'nome': response.nome,
              'resource': (response.tipo === 'arquivo') ? (window.location.toString() + '/itens/' + response.id + '/download') : response.link,
              'icone': (response.tipo === 'repositorio') ? 'https://image.flaticon.com/icons/svg/25/25231.svg' : (response.tipo === 'documentoGoogle' ? 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google-Docs-logo-transparent.max-300x300.png' : 'http://www.iconhot.com/icon/png/devine-icons-part-2/512/defult-text.png')
            }],
            'lista2': prevState.dados.lista2,
            'onChangeDropdown': prevState.dados.onChangeDropdown,
            valueDropdown: prevState.dados.valueDropdown,
            'lista1': prevState.dados.lista1,
            'lista3': prevState.dados.lista3,
            'onSelectOption': prevState.dados.onSelectOption,
            listaOpcoes: prevState.dados.listaOpcoes
          }
          })))
      }
    }
  }
  async handleResponse (response) {
    let authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'))

    // Preenche a lista de opcoes do dropdown com os projetos do usuario
    for (let i = 0; i < response.projetos.length; i++) {
      window.fetch(apiUrl + response.projetos[i], {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + authorizationBasic
        }
      }).then(response => response.json())
        .then(response => this.setState(prevState => ({ dados: {
          'lista1': prevState.dados.lista1,
          'lista2': prevState.dados.lista2,
          'onChangeDropdown': prevState.dados.onChangeDropdown,
          valueDropdown: prevState.dados.valueDropdown,
          'lista3': prevState.dados.lista3,
          'lista4': prevState.dados.lista4,
          'onSelectOption': prevState.dados.onSelectOption,
          listaOpcoes: [...prevState.dados.listaOpcoes, { 'text': response.nome + ' (' + response.id + ')', 'value': '' + response.id }]
        }
        })))
      // IMPORTANTE: "value": "" + response.id Isso eh pra converter o id para string
    }

    let responseDir = await window.fetch(apiUrl + '/diretorios/' + this.state.idDiretorio, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())

    await this.setState(prevState => ({
      dados: {
        'lista1': prevState.dados.lista1,
        'lista2': prevState.dados.lista2,
        'onChangeDropdown': prevState.dados.onChangeDropdown,
        valueDropdown: responseDir.projeto.substring('/projetos/'.length),
        'lista3': prevState.dados.lista3,
        'lista4': prevState.dados.lista4,
        'onSelectOption': prevState.dados.onSelectOption,
        listaOpcoes: prevState.dados.listaOpcoes
      }
    }))

    console.log(this.state.dados.valueDropdown)
    // Pega os detalhes do projeto atual
    let responseProjeto = await window.fetch(apiUrl + /projetos/ + this.state.dados.valueDropdown, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())

    console.log(responseProjeto)
  }

  componentDidMount () {
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

    window.fetch(apiUrl + '/diretorios/' + this.state.idDiretorio, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + authorizationBasic
      }
    }).then(response => response.json())
      .then(response => this.handleDirResponse(response))
  }
};
