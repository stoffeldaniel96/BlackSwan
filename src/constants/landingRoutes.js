import React from 'react';

const Landing = React.lazy(() => import('../containers/Landing/Landing'));
const Login = React.lazy(() => import('../pages/Login/Login.js'));
const Dash = React.lazy(() => import('../pages/Dash/Dash.js'));

const landingRoutes = [
    {
        path: "/Login",
        exact: false,
        name: "Login",
        protected: false,
        component: Login
    },
    {
        path: "/home/dash",
        exact: false,
        name: "Dash",
        component: Dash
    },
    {
        path: "/",
        exact: false,
        name: "Landing",
        protected: false,
        component: Landing
    },
];

export default landingRoutes;
