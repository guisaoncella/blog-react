import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import firebase from '../../firebase';

import './newpost.css'

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            descricao: ''
        }
        this.cadastrarPost = this.cadastrarPost.bind(this);
    }

    componentDidMount() {
        if(!firebase.getCurrent()){
            this.props.history.replace('/login')
            return null
        }
    }

    cadastrarPost = async (e) =>{
        e.preventDefault()
        const {titulo, imagem, descricao} = this.state
        let succes = true
        try{
            if(titulo !== '' && imagem !== '' && descricao !== ''){
                await firebase.newPost(localStorage.nome, descricao, imagem, titulo).catch((error) => {
                    alert('Falha ao cadastrar!  '+error.code)
                    console.log(error.code)
                    succes = false
                }) 
                if(succes){
                    alert("Postado com sucesso!")
                }
                this.props.history.replace('/dashboard')
            }else{
                alert("Nenhum campo pode estar vazio!")    
            }
        }catch(erro){
            alert(erro.message)
        }
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
                    <textarea placeholder="Descrição..." value={this.state.descricao} 
                        onChange={(e) => {this.setState({descricao: e.target.value})}} /><br/>

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