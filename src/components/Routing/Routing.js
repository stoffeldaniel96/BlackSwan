import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch, Redirect } from "react-router-dom";
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
    const {
        classes,
        selectTab,
        routes
    } = props;
    return (
        <div className={classes.wrapper}>
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
        </div>
    );
}

Routing.propTypes = {
    classes: PropTypes.object.isRequired,
    selectTab: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(Routing));