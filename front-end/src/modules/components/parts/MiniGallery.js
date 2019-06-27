import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: theme.spacing.unit * 1,
    },
    img: {
        height:'100px',
        width:'100px',
        backgroundSize:'cover',
        backgroundPosition:'top center',
        margin: '1px'
    }

});

function Gallery(props){
    const {persons , classes, selectedImage} = props;

    return (
        <div className={classes.root}>
            {persons.map((person, idx) => (
                (idx === selectedImage)?
                <div className={classes.img} style={{backgroundImage:`url(${person.image})`}}></div>
                :
                <div className={classes.img} style={{backgroundImage:`url(${person.image})`,filter:'opacity(30%)'
            }}></div>

            ))}
            
           
        </div>


    );
}

export default withStyles(styles)(Gallery);