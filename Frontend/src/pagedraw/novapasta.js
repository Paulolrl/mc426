// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Componentebotao from './componentebotao';
import './novapasta.css';


function render() {
    return <div className="novapasta-novapasta-6">
        <div className="novapasta-0">
            <div className="novapasta-text_5">Nova Pasta</div>
        </div>
        <div className="novapasta-1">
            <div className="novapasta-1-0">
                <div className="novapasta-1-0-0">
                    <div className="novapasta-text_1">{"Nome da Pasta:"}</div>
                </div>
            </div>
            <input type="text" placeholder="Nome Pasta" value={this.props.nome} onChange={(e) => this.props.setNome(e.target.value)} className="novapasta-nome-9" /> 
        </div>
        <div className="novapasta-2">
            <div onClick={this.props.handleClick} className="novapasta-rectangle_2">
                <div className="novapasta-2-0-0">
                    <div className="novapasta-botaosalvar-3">
                        <Componentebotao textoBotao={"Salvar"} color={"rgb(17, 39, 73)"} /> 
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
