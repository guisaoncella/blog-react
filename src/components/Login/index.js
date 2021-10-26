import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import firebase from '../../firebase';
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.entrar = this.entrar.bind(this);
    }

    entrar(e){
        e.preventDefault()

    }

    login = async () => {
        const {email, password} = this.state

        try{
            await firebase.login(email, password).catch((error) =>{
                if(error.code === 'auth/user-not-found'){
                    alert('Este usuário não existe!')
                }else{
                    alert('Erro: '+error.code)    
                    return null
                }
            })
        }catch(error){
            alert(error.message)
        }
        
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.entrar} id="login">
                    <label>Email: </label>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email} 
                        onChange={(e) => this.setState({email: e.target.value})} placeholder="Seu email" />
                    <br/>
                    <label>Senha: </label>
                    <input type="password" autoComplete="off" autoFocus value={this.state.email} 
                        onChange={(e) => this.setState({password: e.target.value})} placeholder="Sua senha" />
                    <br/>
                    <button type="submit">Entrar</button>

                    <Link to="/register">Ainda não possui uma conta?</Link>
                </form>
            </div>
        );
    }
}

export default Login;