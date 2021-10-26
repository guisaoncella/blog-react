import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css'
import firebase from './firebase';

import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Register from './components/Register';

class App extends Component {
    state = {
        firebaseInitialized: false
    }

    componentDidMount() {
        firebase.isInitialized().then(resultado =>{
            //retorna o usuario conectado
            this.setState({firebaseInitialized: resultado})
        })   
    }

    render() {
        return this.state.firebaseInitialized !== false ? (
            <div>
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </BrowserRouter>   
            </div>
        ) : (
            <h1>Carregando...</h1>
        )
    }
}

export default App;