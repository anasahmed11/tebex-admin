// Provides a large text section with icon and title on top.
import React from 'react';
import uuid from 'uuid';

import { withStyles, Grid, Typography } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/TextSection';

class InfoItem extends React.Component {
    render(){
        const { image, title, description, classes } = this.props;        
        return <Grid container className={classes.root}  justify='center' alignItems='center' >
                <Grid item xs={12} key={uuid()}>
                   <img src={image} className={classes.img} alt="Company"/>
                </Grid>
                <Grid item xs={12} key={uuid()}  className={classes.content}>
                    <Typography variant="h4" className={classes.title}>
                        {title}
                    </Typography>
                    <Typography variant="h6" className={classes.description}>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
    }
}

export default withStyles(styles)(InfoItem);