// Generated by https://pagedraw.io/pages/10782
import React from 'react';
import Componentebotao from './componentebotao';
import './uploadarquivo.css';


function render() {
    return <div className="uploadarquivo-uploadarquivo-7">
        <div className="uploadarquivo-0">
            <div className="uploadarquivo-text_5">Upload Arquivo</div>
        </div>
        <div className="uploadarquivo-1">
            <div onChange={(e) => this.props.handleChange(e.target.files)} className="uploadarquivo-arquivo-3">
                <input type="file" /> 
            </div>
        </div>
        <div className="uploadarquivo-2">
            <div onClick={this.props.handleClick} className="uploadarquivo-rectangle_2">
                <div className="uploadarquivo-2-0-0">
                    <div className="uploadarquivo-botaoupload-3">
                        <Componentebotao textoBotao={"Upload"} color={"rgb(17, 39, 73)"} /> 
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
