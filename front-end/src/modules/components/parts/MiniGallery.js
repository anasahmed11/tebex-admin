import React from 'react';
import { withStyles } from '@material-ui/core';
import uuid from 'uuid';

import styles from '../../../assets/jss/components/parts/MiniGallery';

const noImage = "https://thefittingsource.com/wp-content/uploads/2017/12/temp-inventory-landing.jpg"

const Gallery = props => {
    
    const {persons , classes, selectedImage} = props;
    return <div className={classes.root}>
            {persons.map((person, idx) => (
                (idx === selectedImage)?
                <div key={uuid()} className={classes.img} style={{backgroundImage:`url(${person.image?person.image:noImage})`}}></div>
                :
                <div key={uuid()} className={classes.img} style={{backgroundImage:`url(${person.image?person.image:noImage})`,filter:'opacity(30%)'}}></div>

            ))}       
        </div>
    );
}

export default withStyles(styles)(Gallery);