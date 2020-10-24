import React, {memo, Fragment, useState, useCallback} from 'react';
import PropTypes from "prop-types";
import Navbar from "../../components/Nav/Navbar";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "../../components/Routing/Routing";
import smoothScrollTop from "../../components/functions/smoothScrollTop";

import homeRoutes from "../../constants/homeRoutes";

const styles = (theme) => ({
    main: {
        marginLeft: theme.spacing(9),
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down("xs")]: {
            marginLeft: 0,
        },
    },
});

const HomeLayout = (props) => {
    const { classes } = props;
    const [selectedTab, setSelectedTab] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [messages, setMessages] = useState([]);

    const selectTab = useCallback((tab) => {
        smoothScrollTop();
        document.title = `A Flock Of Black Swan - ${tab}`;
        setSelectedTab(tab);
    }, []) //es-lint-disable-line react-hooks.exh

    return (
        <Fragment>
            {selectedTab && <Navbar
                selectedTab={selectedTab}
                navRoutes={homeRoutes}
                messages={messages}
            />}
            <main className={classNames(classes.main)}>
                <Routing
                    routes={homeRoutes}
                    selectTab={(tab) => selectTab(tab)}
                />
            </main>
        </Fragment>
    );
};

HomeLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(HomeLayout));