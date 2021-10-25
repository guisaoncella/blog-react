import app from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

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
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }
    
    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve)
        })
    }
}

export default new Firebase();