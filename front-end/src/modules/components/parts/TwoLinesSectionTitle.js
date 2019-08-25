import React from "react";

import { withStyles, Typography } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/LinedSectionTitle';

class LinedTitle extends React.Component {
    render(){
        const { classes, color } = this.props;
        return <Typography style={{color: color? color : '#FFF'}} variant="h4" className={classes.typo}>
                    {this.props.children}
                <span className={classes.span} />
              </Typography>
    }
}


export default withStyles(styles)(LinedTitle);