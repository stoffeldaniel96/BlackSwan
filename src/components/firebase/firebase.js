import * as firebaseApp from "firebase/app";
import "firebase/auth";
import { Self } from "../../util/API";

const firebaseConfig = {
    apiKey: "AIzaSyDMvDXOiZimcV0QE28nQZAY4koi32ed5Fo",
    authDomain: "a-flock-of-black-swan-dev.firebaseapp.com",
    databaseURL: "https://a-flock-of-black-swan-dev.firebaseio.com",
    projectId: "a-flock-of-black-swan-dev",
    storageBucket: "a-flock-of-black-swan-dev.appspot.com",
    messagingSenderId: "444137895503",
    appId: "1:444137895503:web:8226319d3b0f90b61b5c3a",
    measurementId: "G-K7K1STPY96"
};
function Firebase () {
    firebaseApp.initializeApp(firebaseConfig);

    this.auth = firebaseApp.auth();

    this.onAuthStateChange = (callback) => {
        return this.auth.onAuthStateChanged(user => {
            if (user) {
                this.auth.currentUser.getIdToken(true).then(token => {
                    Self.read(token).then(dbUser => {
                        const getToken = async (force = false) => {return await this.auth.currentUser.getIdToken(force)}
                        callback({loggedIn: true, user: {...dbUser.data, getToken: getToken}, initializing: false})
                    }).catch(error => {
                        console.warn(error)
                    })
                })
            } else {
                callback({loggedIn: false, user: {}, initializing: false})
            }
        });
    }
}

export default Firebase