import React from 'react';

const Landing = React.lazy(() => import('../containers/Landing/Landing'));
const Login = React.lazy(() => import('../pages/Login/Login.js'));
const Home = React.lazy(()=> import('../containers/UserHome/HomeLayout'));

const landingRoutes = [
    {
        path: "/Login",
        exact: false,
        name: "Login",
        protected: false,
        component: Login
    },
    {
        path: "/home",
        exact: false,
        name: "Home",
        component: Home
    },
    {
        path: "/",
        exact: true,
        name: "Landing",
        protected: false,
        component: Landing
    },
];

export default landingRoutes;
