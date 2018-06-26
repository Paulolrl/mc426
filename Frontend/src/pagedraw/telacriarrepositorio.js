// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Menu from './menu';
import Barratarefas from './barratarefas';
import Adicionarrepositorio from './adicionarrepositorio';
import Barraagenda from './barraagenda';
import './telacriarrepositorio.css';


function render() {
    return <div className="telacriarrepositorio-telacriarrepositorio-8">
        <div className="telacriarrepositorio-0">
            <div className="telacriarrepositorio-menu_instance_1">
                <Menu nomeUsuario={this.props.nomeUsuario} /> 
            </div>
        </div>
        <div className="telacriarrepositorio-1">
            <div className="telacriarrepositorio-barratarefas_instance_2">
                <Barratarefas listaTarefas={this.props.listaMinhasTarefas} /> 
            </div>
            <div className="telacriarrepositorio-adicionarrepositorio-0">
                <Adicionarrepositorio nome={this.props.nome} link={this.props.link} setNome={this.props.setNome} setLink={this.props.setLink} handleClick={this.props.handleClick} /> 
            </div>
            <div className="telacriarrepositorio-barraagenda_instance_2">
                <Barraagenda /> 
            </div>
        </div>
        <div className="telacriarrepositorio-2" /> 
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
