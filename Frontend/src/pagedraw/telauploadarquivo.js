// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Menu from './menu';
import Barratarefas from './barratarefas';
import Uploadarquivo from './uploadarquivo';
import Barraagenda from './barraagenda';
import './telauploadarquivo.css';


function render() {
    return <div className="telauploadarquivo-telauploadarquivo-3">
        <div className="telauploadarquivo-0">
            <div className="telauploadarquivo-menu_instance_1">
                <Menu nomeUsuario={this.props.nomeUsuario} /> 
            </div>
        </div>
        <div className="telauploadarquivo-1">
            <div className="telauploadarquivo-barratarefas_instance_2">
                <Barratarefas listaTarefas={this.props.listaMinhasTarefas} /> 
            </div>
            <div className="telauploadarquivo-uploadarquivo_instance-4">
                <Uploadarquivo handleChange={this.props.handleChange} handleClick={this.props.handleClick} /> 
            </div>
            <div className="telauploadarquivo-barraagenda_instance_2">
                <Barraagenda /> 
            </div>
        </div>
        <div className="telauploadarquivo-2" /> 
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
