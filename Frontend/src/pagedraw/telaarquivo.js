// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Semanticuidropdown from './semanticuidropdown';
import Arquivo from './arquivo';
import './telaarquivo.css';


function render() {
    return <div className="telaarquivo-telaarquivo-0">
        <div className="telaarquivo-0">
            <div className="telaarquivo-titulotarefa-1">Arquivos</div>
        </div>
        <div className="telaarquivo-1">
            <div className="telaarquivo-semanticuidropdown_instance_2">
                <Semanticuidropdown value={this.props.dados.valueDropdown} onChange={this.props.dados.onChangeDropdown} placeholder={"Projetos"} options={this.props.dados.listaOpcoes} /> 
            </div>
            <div className="telaarquivo-semanticuidropdown_instance_3">
                <Semanticuidropdown value={""} onChange={this.props.dados.onSelectOption} placeholder={"Adicionar"} options={[{"text": "Pasta", "value": "subdiretorio"}, {"text": "Upload Arquivo", "value": "novoArquivo"}, {"text": "Repositório Github", "value": "repositorio"}, {"text": "Documento Google", "value": "doc"}]} /> 
            </div>
        </div>
        <div className="telaarquivo-2">
            <div className="telaarquivo-2-0">
                { (this.props.dados.lista1).map((elem, i) => {
                    return <div key={i} className="telaarquivo-lista1">
                        <div className="telaarquivo-2-0-0-0-0">
                            <div className="telaarquivo-pasta_instance-2">
                                <Arquivo icone={elem.icone} nome={elem.nome} handleClick={elem.handleClick} resource={elem.resource} /> 
                            </div>
                        </div>
                    </div>;
                }) }
            </div>
            <div className="telaarquivo-2-1">
                { (this.props.dados.lista2).map((elem, i) => {
                    return <div key={i} className="telaarquivo-rectangle_2">
                        <div className="telaarquivo-2-1-0-0-0">
                            <div className="telaarquivo-pasta_instance-9">
                                <Arquivo icone={elem.icone} nome={elem.nome} handleClick={elem.handleClick} resource={elem.resource} /> 
                            </div>
                        </div>
                    </div>;
                }) }
            </div>
            <div className="telaarquivo-2-2">
                { (this.props.dados.lista3).map((elem, i) => {
                    return <div key={i} className="telaarquivo-rectangle_22">
                        <div className="telaarquivo-2-2-0-0-0">
                            <div className="telaarquivo-pasta_instance-3">
                                <Arquivo icone={elem.icone} nome={elem.nome} handleClick={elem.handleClick} resource={elem.resource} /> 
                            </div>
                        </div>
                    </div>;
                }) }
            </div>
            <div className="telaarquivo-2-3">
                { (this.props.dados.lista4).map((elem, i) => {
                    return <div key={i} className="telaarquivo-rectangle_22-8">
                        <div className="telaarquivo-2-3-0-0-0">
                            <div className="telaarquivo-pasta_instance-1">
                                <Arquivo icone={elem.icone} nome={elem.nome} handleClick={elem.handleClick} resource={elem.resource} /> 
                            </div>
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
