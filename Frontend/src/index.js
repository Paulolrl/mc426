import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router'

import './index.css'
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import AppLogin from './applogin'
import AppEquipes from './appequipes'
import AppCriarEquipe from './appcriarequipe'
import AppProjetos from './appprojetos'
import AppCriarProjeto from './appcriarprojeto'
import AppDetalheEquipe from './appdetalheequipe'
import AppDetalhesProjeto from './appdetalhesprojeto'
import AppTarefas from './apptarefas'
import AppCriarTarefa from './appcriartarefa'
import AppDecideProjeto from './appdecideprojeto'
import AppDetalhesTarefa from './appdetalhestarefa'
import AppUploadArquivo from './appuploadarquivo'
import AppCriarDiretorio from './appcriardiretorio'
import AppCriarRepositorio from './appcriarrepositorio'
import AppCriarDoc from './appcriardoc'
import AppDiretorio from './appdiretorio'
import AppDownloadArquivo from './appdownloadarquivo'
import AppDecideProjetoArquivo from './appdecideprojetoarquivo'
// There's no special libraries or javascript layout systems, just code written for you.

render((
  <Router>
    <Switch>
      <Route exact path='/' component={AppLogin} />
      <Route exact path='/equipes' component={AppEquipes} />
      <Route exact path='/tarefas' component={AppDecideProjeto} />
      <Route exact path='/projetos' component={AppProjetos} />
      <Route path='/equipes/nova' component={AppCriarEquipe} />
      <Route path='/projetos/novo' component={AppCriarProjeto} />
      <Route exact path='/equipes/:idEquipe([0-9]{1,40})' component={AppDetalheEquipe} />
      <Route exact path='/projetos/:idProjeto([0-9]{1,40})' component={AppDetalhesProjeto} />
      <Route exact path='/projetos/:idProjeto([0-9]{1,40})/tarefas' component={AppTarefas} />
      <Route exact path='/projetos/:idProjeto([0-9]{1,40})/tarefas/nova' component={AppCriarTarefa} />
      <Route exact path='/projetos/:idProjeto([0-9]{1,40})/tarefas/:idTarefa([0-9]{1,40})' component={AppDetalhesTarefa} />
      <Route exact path='/diretorios/:idDiretorio([0-9]{1,40})' component={AppDiretorio} />
      <Route exact path='/diretorios/:idDiretorio([0-9]{1,40})/novoArquivo' component={AppUploadArquivo} />
      <Route exact path='/diretorios/:idDiretorio([0-9]{1,40})/subdiretorio' component={AppCriarDiretorio} />
      <Route exact path='/diretorios/:idDiretorio([0-9]{1,40})/repositorio' component={AppCriarRepositorio} />
      <Route exact path='/diretorios/:idDiretorio([0-9]{1,40})/doc' component={AppCriarDoc} />
      <Route exact path='/diretorios/:idDiretorio([0-9]{1,40})/itens/:idItem([0-9]{1,40})/download' component={AppDownloadArquivo} />
      <Route exact path='/arquivos' component={AppDecideProjetoArquivo} />
    </Switch>
  </Router>), document.getElementById('root'))
