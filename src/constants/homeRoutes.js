import React from 'react';

import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import StorageIcon from "@material-ui/icons/Storage";
import MapIcon from "@material-ui/icons/Map";
import MenuBookIcon from "@material-ui/icons/MenuBook"

const Dash = React.lazy(()=> import('../pages/Dash/Dash'));
const Character = React.lazy(()=> import('../pages/Character/Character'));
const Inventory = React.lazy(()=> import('../pages/Inventory/Inventory'));
const MapPage = React.lazy(()=> import('../pages/MapPage/MapPage'));
const Journal = React.lazy(()=> import('../pages/Journal'));

const homeRoutes = [
    {
        path: "/home/dash",
        exact: false,
        name: "Dashboard",
        icon: DashboardIcon,
        component: Dash
    },
    {
        path: "/home/character",
        exact: false,
        name: "Character",
        icon: PersonIcon,
        component: Character
    },
    {
        path: "/home/inventory",
        exact: false,
        name: "Inventory",
        icon: StorageIcon,
        component: Inventory
    },
    {
        path: "/home/map",
        exact: false,
        name: "Map",
        icon: MapIcon,
        component: MapPage
    },
    {
        path: "/home/Journal",
        exact: false,
        name: "Journal",
        icon: MenuBookIcon,
        component: Journal
    },
];

export default homeRoutes;
