import React, {Suspense} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {MuiThemeProvider, CssBaseline} from "@material-ui/core";

import Firebase from "./components/firebase/firebase";
import {useAuth} from './components/auth/auth'
import theme from "./components/theme/theme";
import Pace from "./components/Pace/Pace";
import GlobalStyles from "./constants/GlobalStyles";
import authContext from "./components/auth/authContext"
import landingRoutes from "./constants/landingRoutes";

const firebase = new Firebase();

function App() {
  const { initializing, user, loggedIn, updateUser } = useAuth(firebase);
  return (
        <authContext.Provider value={{user, initializing, firebase, loggedIn, updateUser}}>
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <GlobalStyles/>
                    <Pace color={theme.palette.primary.light} />
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
                </MuiThemeProvider>
            </BrowserRouter>
        </authContext.Provider>
  );
}

export default App;
