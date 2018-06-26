// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Componentebotao from './componentebotao';
import './adicionarrepositorio.css';


function render() {
    return <div className="adicionarrepositorio-adicionarrepositorio-1">
        <div className="adicionarrepositorio-0">
            <div className="adicionarrepositorio-titulo-5">
                {"Adicionar Repositório Existente"}
            </div>
        </div>
        <div className="adicionarrepositorio-1">
            <div className="adicionarrepositorio-1-0">
                <div className="adicionarrepositorio-1-0-0">
                    <div className="adicionarrepositorio-nome-9">
                        {"Nome:"}
                    </div>
                </div>
            </div>
            <input type="text" placeholder="Nome Repostório" value={this.props.nome} onChange={(e) => this.props.setNome(e.target.value)} className="adicionarrepositorio-nome-7" /> 
        </div>
        <div className="adicionarrepositorio-2">
            <div className="adicionarrepositorio-2-0">
                <div className="adicionarrepositorio-2-0-0">
                    <div className="adicionarrepositorio-link-5">
                        {"Link:"}
                    </div>
                </div>
            </div>
            <input type="text" value={this.props.link} onChange={(e) => this.props.setLink(e.target.value)} className="adicionarrepositorio-link-4" /> 
        </div>
        <div className="adicionarrepositorio-3">
            <div onClick={this.props.handleClick} className="adicionarrepositorio-rectangle_2">
                <div className="adicionarrepositorio-3-0-0">
                    <div className="adicionarrepositorio-componentebotao_instance-3">
                        <Componentebotao textoBotao={"Adicionar"} color={"rgb(17, 39, 73)"} /> 
                    </div>
                </div>
            </div>
        </div>
        <div className="adicionarrepositorio-4">
            <div className="adicionarrepositorio-textogithub-5">
                {"Não criou ainda?"}
            </div>
        </div>
        <div className="adicionarrepositorio-5">
            <a href="https://help.github.com/articles/create-a-repo/" className="adicionarrepositorio-5-0">
                <div className="adicionarrepositorio-github-7">
                    {"Como criar repositório Github"}
                </div>
            </a>
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
