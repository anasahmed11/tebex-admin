import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';

import styles from '../../assets/jss/views/Blank';

const NotFound = props => {
    const { classes } = props;
    return (
        <Grid container justify='center' alignItems="center" className={classes.root}>
            <Grid container alignItems="center" justify="center" >
                <ClipLoader
                    sizeUnit={"px"}
                    size={75}
                    color={'#123abc'}
                    loading={true}
                />
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(NotFound);