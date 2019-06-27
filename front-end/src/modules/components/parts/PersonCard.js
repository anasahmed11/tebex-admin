import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';


const styles = {
    root:{
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: '300px',
    },
    CardContent: {
        backgroundColor: '#f50057',
        color:'white'
    }
};

function MediaCard(props) {

    const { classes, person } = props;
    return <Grid justify="center" alignItems='center' container className={classes.root} >
            <Card className={classes.card}>
                <CardActionArea>
                <CardMedia
                    className = {classes.media}
                    image = {person.image}
                    title = {person.name}
                    style = {{backgroundPosition:'top center',}}
                />
                <CardContent className={classes.CardContent}>
                    <Typography gutterBottom color="inherit" variant="h5" component="h2">
                        {person.name}
                    </Typography>
                    <Typography component="p" color="inherit">
                        {person.description}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Grid>    
  }
  
  MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(MediaCard);