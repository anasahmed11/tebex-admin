import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 20,
        backgroundColor: 'lightblue',
    },
    banner: {
        borderRadius: '0px'
    },
    text: {
        [theme.breakpoints.down("xs")]: {
            fontSize: 30
        }
    }
})

function StoreBanner(props){
    
    const {classes} = props;

    return <Grid container className={classes.root} >
                <Grid lg={12} sm={12} className={classes.banner}>
                    <Typography variant="h1" align="center">
                        {props.text}
                    </Typography>
                </Grid> 
            </Grid>
}

export default withStyles(styles)(StoreBanner);