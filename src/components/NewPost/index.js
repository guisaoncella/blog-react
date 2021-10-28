import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import firebase from '../../firebase';

import './newpost.css'

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            progress: 0
        }
        this.cadastrarPost = this.cadastrarPost.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        if(!firebase.getCurrent()){
            this.props.history.replace('/login')
            return null
        }
    }

    handleFile = async (e) => {
        if(e.target.files[0]){
            const image = e.target.files[0]
            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({imagem: image})    
                this.handleUpload()
            }else{
                alert('Arquivo inválido! Selecione uma imagem PNG ou JPG')
                this.setState({imagem: null})
                return null
            }
        }
        
    }

    handleUpload = async () => {
        const {imagem} = this.state
        const currentUid = firebase.getUid()
        const upload = firebase.imageUpload(currentUid, imagem)

        await upload.on('state_changed', (snapshot) => {
            //progress    
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progress})
        },
        (error) => {
            //error
        },() => {
            //succes
            firebase.getImageUrl(currentUid, imagem).then(url => {
                this.setState({url: url})    
            })
        })
    }

    cadastrarPost = async (e) =>{
        e.preventDefault()
        const {titulo, url, descricao} = this.state
        let succes = true
        try{
            if(titulo !== '' && url !== '' && descricao !== ''){
                await firebase.newPost(localStorage.nome, descricao, url, titulo).catch((error) => {
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
                    <label>Imagem:</label><br/>
                    <input type="file" onChange={this.handleFile} className="file-input" accept="image/png, image/jpeg" /><br/>
                        {this.state.url !== '' ? 
                        <img src={this.state.url} width="200" height="150" alt="Capa do post"/> 
                        : <progress value={this.state.progress} max="100" />}
                        
                    <label>Titulo:</label><br/>
                    <input type="text" placeholder="Titulo do post" value={this.state.titulo} 
                        onChange={(e) => {this.setState({titulo: e.target.value})}} autoFocus className="text-input"/><br/>

                    <label>Descrição:</label><br/>
                    <textarea placeholder="Descrição..." value={this.state.descricao} 
                        onChange={(e) => {this.setState({descricao: e.target.value})}} className="text-input"/><br/>

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