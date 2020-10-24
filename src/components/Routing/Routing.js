import React, { memo, Fragment, Suspense, useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Redirect, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import PropsRoute from "../PropsRoute/PropsRoute";

const styles = (theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        width: "auto",
        [theme.breakpoints.up("xs")]: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "82.5%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
});

function Routing(props) {
    const history = useHistory();
    const {
        classes,
        selectTab,
        routes
    } = props;

    useEffect(() => {
        const index = routes.findIndex(route => route.path === history.location.pathname)
        if (index >= 0) {
            selectTab(routes[index].name)
        }
    },[history.location]) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classes.wrapper}>
            <Suspense fallback={<Fragment/>}>
                <Switch>
                    {routes.map(route => (
                        <PropsRoute
                            key={route.name}
                            path={route.path}
                            component={route.component}
                            selectTab={(tab)=> selectTab(tab)}
                        />
                    ))}
                    <Redirect to="/home/dash"/>
                </Switch>
            </Suspense>
        </div>
    );
}

Routing.propTypes = {
    classes: PropTypes.object.isRequired,
    selectTab: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(Routing));