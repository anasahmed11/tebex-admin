import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, Paper,  } from '@material-ui/core';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        height: 'fit-content',
        flexGrow: 1,
    },
    textHead:{
        fontWeight:'500'
    },
});

class UserDashBoard extends React.Component{
    state ={
    }

    render(){
        const {classes, } = this.props;
        
        return(
            <Grid container justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='display1' className={classes.textHead}>مولد اللينكات</Typography>
                </Grid>
                <Grid container xs={12} >
                    <Paper className={classes.root} elevation={1}>
                        <Typography component='h3' variant="title">
                            اللينك بتاعك اهو
                        </Typography>
                        <Typography variant="title">
                            <a href='#'>mysite.com/register?ref=ghst29910kjla912039x</a>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(UserDashBoard);