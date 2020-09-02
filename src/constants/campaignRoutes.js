import React from 'react';

const Dash = React.lazy(() => import('../pages/Dash/Dash.js'));

const campaignRoutes = [
    {
        path: "/home/dash",
        exact: false,
        name: "Dash",
        component: Dash
    }
];

export default campaignRoutes;