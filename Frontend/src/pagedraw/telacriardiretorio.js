// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Menu from './menu';
import Barratarefas from './barratarefas';
import Novapasta from './novapasta';
import Barraagenda from './barraagenda';
import './telacriardiretorio.css';


function render() {
    return <div className="telacriardiretorio-telacriardiretorio-3">
        <div className="telacriardiretorio-0">
            <div className="telacriardiretorio-menu_instance_1">
                <Menu nomeUsuario={this.props.nomeUsuario} /> 
            </div>
        </div>
        <div className="telacriardiretorio-1">
            <div className="telacriardiretorio-barratarefas_instance_2">
                <Barratarefas listaTarefas={[]} /> 
            </div>
            <div className="telacriardiretorio-novapasta_instance-2">
                <Novapasta nome={this.props.nome} setNome={this.props.setNome} handleClick={this.props.handleClick} /> 
            </div>
            <div className="telacriardiretorio-barraagenda_instance_2">
                <Barraagenda /> 
            </div>
        </div>
        <div className="telacriardiretorio-2" /> 
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
