import app from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

//configurações do firebase
let firebaseConfig = {
    apiKey: "AIzaSyACZCa6Nr27HKjxEyvRx2bzl22ORIGY2RU",
    authDomain: "blog-b5153.firebaseapp.com",
    databaseURL: "https://blog-b5153-default-rtdb.firebaseio.com",
    projectId: "blog-b5153",
    storageBucket: "blog-b5153.appspot.com",
    messagingSenderId: "393058268355",
    appId: "1:393058268355:web:6672f2fee2319e2acb1e76",
    measurementId: "G-L43PRS9SWQ"
};

class Firebase{
    constructor(props) {
        app.initializeApp(firebaseConfig)      
        this.app = app.database()  
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut()
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    newPost(autor, descricao, imagem, titulo){
        let posts = app.database().ref('posts')
        let chave = posts.push().key
        return posts.child(chave).set({
            autor: autor,
            descricao: descricao,
            imagem: imagem,
            titulo: titulo
        })
    }
    
    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null
        }  
        const uid = app.auth().currentUser.uid  
        await app.database().ref('usuarios').child(uid).once('value').then(callback)
    }
}

export default new Firebase();