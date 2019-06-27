import React from "react";
import { withStyles, Typography } from '@material-ui/core';


const styles = theme => ({
    span: {
      height: 4,
      width: 80,
      display: 'block',
      margin: `${theme.spacing.unit}px auto`,
      backgroundColor: theme.palette.secondary.main,
    },
    typo: {
      width: '100%',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      color: 'white',
    },

})

class LinedTitle extends React.Component {
    
  state = {

    };

    render(){

        const { classes } = this.props;
        return <Typography variant="h4" className={classes.typo}>
                <span className={classes.span} />
                    {this.props.children}
                <span className={classes.span} />
              </Typography>
    }
}


export default withStyles(styles)(LinedTitle);