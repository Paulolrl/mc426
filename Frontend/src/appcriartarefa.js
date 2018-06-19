import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaCriarTarefa from './pagedraw/telacriartarefa'

const apiUrl = 'http://localhost:8080/Backend/mc426';

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
            />
        );
    }

    async handleSubmit() {
        var authorizationBasic = window.btoa(window.localStorage.getItem('usuarioADA') + ':' + window.localStorage.getItem('senhaADA'));
        let responseProjetos = await fetch(apiUrl + '/projetos/',{
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + authorizationBasic
            }
        });
        let projetosJson = await responseProjetos.json();
        let responsePost = await fetch(apiUrl + projetosJson.projetos[0] +'/tarefas/',{
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + authorizationBasic,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: this.state.nomeTarefa,
                descricao: this.state.descricao,
                prazo: this.state.data,
                responsaveis: this.state.responsaveis.split(/[ ,]/).filter(function(el) {return el.length !== 0}).map(x => "/usuarios/" + x),
                dependencias: [],
                tags: this.state.tags.split(/[ ,]/).filter(function(el) {return el.length !== 0}),
                arquivos: [],
            })
        })
        window.location = '/tarefas';
    }

    setNomeTarefa(value) {
        this.setState({
            nomeTarefa: value
        })
    }

    setDescricao(value) {
        this.setState({
            descricao: value
        })
    }

    setTags(value) {
        this.setState({
            tags: value
        })
    }

    setResponsaveis(value) {
        this.setState({
            responsaveis: value
        })
    }

    setPrazo(value) {
        this.setState({
            data: value
        })
    }


    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setNomeTarefa = this.setNomeTarefa.bind(this);
        this.setDescricao = this.setDescricao.bind(this);
        this.setTags = this.setTags.bind(this);
        this.setResponsaveis = this.setResponsaveis.bind(this);
        this.setPrazo = this.setPrazo.bind(this);

        this.state = {
            "nomeUsuario": window.localStorage.getItem('usuarioADA'),
            nomeTarefa: "",
            descricao: "",
            tags: "",
            responsaveis: "",
            data: "",
            nomeUsuario: ""
        };
    }

    componentDidMount() {
        console.log(window.localStorage.getItem('usuarioADA'));
        this.setState({nomeUsuario: window.localStorage.getItem('usuarioADA')});
    }
};
