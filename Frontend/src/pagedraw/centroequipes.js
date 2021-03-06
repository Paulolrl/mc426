// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Componentebotao from './componentebotao';
import Cardequipe from './cardequipe';
import './centroequipes.css';


function render() {
    return <div className="centroequipes-centroequipes-2">
        <div className="centroequipes-0">
            <div className="centroequipes-text_1">Equipes</div>
            <a href="/equipes/nova" className="centroequipes-0-1">
                <div className="centroequipes-componentebotao_instance_3">
                    <Componentebotao textoBotao={"Adicionar Equipe"} color={"rgb(17, 39, 73)"} /> 
                </div>
            </a>
        </div>
        <div className="centroequipes-1">
            <div className="centroequipes-1-0">
                <div className="centroequipes-1-0-0">
                    <div className="centroequipes-1-0-0-0">
                        { (this.props.listaEquipes1).map((elem, i) => {
                            return <div key={i} className="centroequipes-rectangle_8">
                                <div className="centroequipes-1-0-0-0-0-0-0">
                                    <div className="centroequipes-cardequipe_instance-1">
                                        <Cardequipe nomeEquipe={elem.nomeEquipe} resourceEquipe={elem.resourceEquipe} /> 
                                    </div>
                                </div>
                            </div>;
                        }) }
                    </div>
                </div>
                <div className="centroequipes-1-0-1" /> 
            </div>
            <div className="centroequipes-1-1">
                <div className="centroequipes-1-1-0">
                    <div className="centroequipes-1-1-0-0">
                        { (this.props.listaEquipes2).map((elem, i) => {
                            return <div key={i} className="centroequipes-rectangle_8-6">
                                <div className="centroequipes-1-1-0-0-0-0-0">
                                    <div className="centroequipes-cardequipe_instance-18">
                                        <Cardequipe nomeEquipe={elem.nomeEquipe} resourceEquipe={elem.resourceEquipe} /> 
                                    </div>
                                </div>
                            </div>;
                        }) }
                    </div>
                </div>
                <div className="centroequipes-1-1-1" /> 
            </div>
            <div className="centroequipes-1-2">
                <div className="centroequipes-1-2-0">
                    <div className="centroequipes-1-2-0-0">
                        { (this.props.listaEquipes3).map((elem, i) => {
                            return <div key={i} className="centroequipes-rectangle_8-2">
                                <div className="centroequipes-1-2-0-0-0-0-0">
                                    <div className="centroequipes-cardequipe_instance-0">
                                        <Cardequipe nomeEquipe={elem.nomeEquipe} resourceEquipe={elem.resourceEquipe} /> 
                                    </div>
                                </div>
                            </div>;
                        }) }
                    </div>
                </div>
                <div className="centroequipes-1-2-1" /> 
            </div>
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
