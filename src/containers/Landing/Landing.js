import React, {memo, Fragment} from 'react';
import { withStyles } from "@material-ui/core";

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

const Landing = (props) => {

    return (
        <Fragment>
            This is the landing Page!
        </Fragment>
    );
};

export default withStyles(styles, { withTheme: true })(memo(Landing));