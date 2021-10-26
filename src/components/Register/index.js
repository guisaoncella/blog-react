import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import firebase from '../../firebase';
import './register.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            password: ''
        }
        this.cadastrar = this.cadastrar.bind(this);
    }
    
    cadastrar(e){
        e.preventDefault()
        this.register()
    }

    register = async () => {
        const {nome, email, password} = this.state
        let succes = true
        try{
            await firebase.register(nome, email, password).catch((error) => {
                alert('Falha ao cadastrar!')
                console.log(error.code)
                succes = false
            })
            if (succes){
                this.props.history.replace('dashboard')
                alert('Cadastrado com sucesso!')
            }
        }catch(error){
            alert(error.message)
        }
    }

    render() {
        return (
            <div>
                <h1 id="register-h1">Novo Usuário</h1>   
                <form onSubmit={this.cadastrar} id="register">
                    <label>Nome:</label>
                    <input type="text" autoFocus autoComplete="off" value={this.state.nome} 
                        onChange={(e) => this.setState({nome: e.target.value})} placeholder="Seu nome" /><br/>

                    <label>Email:</label>
                    <input type="email" autoComplete="off" value={this.state.email} 
                        onChange={(e) => this.setState({email: e.target.value})} placeholder="Seu email" /><br/>

                    <label>Senha:</label>
                    <input type="password" autoComplete="off" value={this.state.password} 
                        onChange={(e) => this.setState({password: e.target.value})} placeholder="Sua senha" /><br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);