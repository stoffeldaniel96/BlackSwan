import React, {Suspense} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import "./scss/styles.scss";

import Firebase from "./components/firebase/firebase";
import {useAuth} from './components/auth/auth'
import authContext from "./components/auth/authContext"
import landingRoutes from "./constants/landingRoutes";

const firebase = new Firebase();

function App() {
    const { initializing, user, loggedIn, updateUser } = useAuth(firebase);
  return (
    <div className="App">
        <authContext.Provider value={{user, initializing, firebase, loggedIn, updateUser}}>
            <BrowserRouter>
                <Suspense fallback={<div className="loadingPage"><div className="loader"/><span style={{color:"#b8a270ff"}}>Loading...</span></div>}>
                    <Switch>
                        {landingRoutes.map(route => (
                            <Route
                                key={route.name}
                                path={route.path}
                                exact={route.exact}
                                render={ () => {
                                    const Component = route.component;
                                    return !loggedIn && route.protected ?
                                        <Redirect to={"/Login"}/> : <Component/>
                                }}
                            />
                        ))}
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </authContext.Provider>
    </div>
  );
}

export default App;
