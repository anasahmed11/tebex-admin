// Provides a large text section with icon and title on top.

import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import uuid from 'uuid';

const styles = theme => ({  
    root:{
        minHeight:'100px'
    },
    img:{
        height:"60px",
    },
    content:{
        backgroundColor:"rgba(0,0,0,0.2)",
        borderRadius:"20px",
        padding:"30px",
    },
    title:{
        color:"#f50057"
    },
    description:{
        color:"white",
        height:"110px",
        [theme.breakpoints.down('sm')]: {    
            height: '125px',
        },    
    }

});


class InfoItem extends React.Component {
    state = {

    };

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