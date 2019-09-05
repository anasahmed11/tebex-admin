import React from "react";

import { withStyles, Typography } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/LinedSectionTitle';

function LinedTitle(props){

    const { classes } = props;
    return <Typography {...props} variant="h4" className={classes.typo}>
                {props.children}
            <span className={classes.span} />
        </Typography>

}


export default withStyles(styles)(LinedTitle);