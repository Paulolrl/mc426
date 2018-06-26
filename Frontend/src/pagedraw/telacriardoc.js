// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Menu from './menu';
import Barratarefas from './barratarefas';
import Docgoogle from './docgoogle';
import Barraagenda from './barraagenda';
import './telacriardoc.css';


function render() {
    return <div className="telacriardoc-telacriardoc-0">
        <div className="telacriardoc-0">
            <div className="telacriardoc-menu_instance_1">
                <Menu nomeUsuario={this.props.nomeUsuario} /> 
            </div>
        </div>
        <div className="telacriardoc-1">
            <div className="telacriardoc-barratarefas_instance_2">
                <Barratarefas listaTarefas={[]} /> 
            </div>
            <div className="telacriardoc-docgoogle_instance-9">
                <Docgoogle nome={this.props.nome} link={this.props.link} setNome={this.props.setNome} setLink={this.props.setLink} handleClick={this.props.handleClick} /> 
            </div>
            <div className="telacriardoc-barraagenda_instance_2">
                <Barraagenda /> 
            </div>
        </div>
        <div className="telacriardoc-2" /> 
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
