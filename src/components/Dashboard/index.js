import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import firebase from '../../firebase';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: localStorage.nome,
            email: localStorage.email
        }
        this.logout = this.logout.bind(this);
    }
    
    async componentDidMount() {
        if(!firebase.getCurrent()){
            this.props.history.replace('/login')    
            return null
        } 

        firebase.getUserName((info) => {
            localStorage.email = firebase.getCurrent()
            localStorage.nome = info.val().nome
            this.setState({nome: localStorage.nome})
            this.setState({email: localStorage.email})
        })
    }

    logout = async () =>{
        await firebase.logout().catch((error) => {
            alert('Logout falhou!')
            console.log(error)
        })

        localStorage.removeItem("nome")
        localStorage.removeItem("email")
        this.props.history.push('/')
    }

    render() {
        return (
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
                <p>Logado com: {this.state.email}</p>
                <button onClick={() => this.logout()}>Sair</button>
            </div>
        );
    }
}

export default withRouter(Dashboard);