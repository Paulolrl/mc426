// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Semanticuidropdown from './semanticuidropdown';
import Componentebotao from './componentebotao';
import Tarefareduzida from './tarefareduzida';
import './centrotarefas.css';


function render() {
    return <div className="centrotarefas-centrotarefas-7">
        <div className="centrotarefas-0">
            <div className="centrotarefas-0-0">
                <div className="centrotarefas-0-0-0">
                    <div className="centrotarefas-semanticuidropdown_instance-2">
                        <Semanticuidropdown value={this.props.valueDropdown} onChange={this.props.onChangeDropdown} placeholder={""} options={this.props.listaOpcoes} /> 
                    </div>
                </div>
            </div>
            <div onClick={() => { window.location += "/nova" }} className="centrotarefas-rectangle_1">
                <div className="centrotarefas-0-1-0">
                    <div className="centrotarefas-botaoadicionarprojeto-3">
                        <Componentebotao textoBotao={"Adicionar Tarefa"} /> 
                    </div>
                </div>
            </div>
        </div>
        <div className="centrotarefas-1">
            <div className="centrotarefas-1-0">
                { this.props.listaTarefas.map((elem, i) => {
                    return <div key={i} className="centrotarefas-rectangle_15">
                        <div className="centrotarefas-1-0-0-0-0">
                            <div className="centrotarefas-tarefareduzida_instance-4">
                                <Tarefareduzida nomeTarefa={elem.nomeTarefa} progresso={elem.corProgresso} prazo={elem.prazo} responsaveis={elem.responsaveis} idTarefa={elem.idTarefa} /> 
                            </div>
                        </div>
                        <div className="centrotarefas-1-0-0-0-1">
                            <div className="centrotarefas-line_5" /> 
                        </div>
                    </div>;
                }) }
            </div>
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
