import React from 'react';
import { withStyles } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/MiniSquaresGallery';

const Gallery = props => {
    
    const {persons , classes, selectedImage} = props;
    const nWidth = Math.ceil(Math.sqrt(persons.length));
    const nHeight = Math.ceil(persons.length/nWidth);
    
    return <div className={classes.root} style={{width:nWidth*100+'px',height:nHeight*100+'px'}}>
            {persons.map((person,idx) => (
                (idx===selectedImage)?
                <div className={classes.img} style={{backgroundImage:`url(${person.image})`}}></div>
                :
                <div className={classes.img} style={{backgroundImage:`url(${person.image})`,filter:'opacity(30%)'}}></div>
            ))}
        </div>
}

export default withStyles(styles)(Gallery);