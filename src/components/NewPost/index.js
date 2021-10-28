import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

import './newpost.css'

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            desricao: ''
        }
        this.cadastrarPost = this.cadastrarPost.bind(this);
    }

    cadastrarPost(){

    }
    
    render() {
        return (
            <div id="newpost">
                <form onSubmit={this.cadastrarPost} id="newpost-form">
                    <label>Titulo:</label>
                    <input type="text" placeholder="Titulo do post" value={this.state.titulo} 
                        onChange={(e) => {this.setState({titulo: e.target.value})}} autoFocus /><br/>

                    <label>Url da imagem:</label>
                    <input type="text" placeholder="Url da imagem" value={this.state.imagem} 
                        onChange={(e) => {this.setState({imagem: e.target.value})}} /><br/>

                    <label>Descrição:</label>
                    <textarea placeholder="Descrição..." value={this.state.desricao} 
                        onChange={(e) => {this.setState({desricao: e.target.value})}} /><br/>

                    <button type="submit">Postar</button>
                </form><br/>
                <footer>
                    <Link to="/dashboard">Voltar</Link>
                </footer>
            </div>
        );
    }
}

export default withRouter(NewPost);