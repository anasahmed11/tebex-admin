import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root:{
        margin:'0 auto',
    },
    img:{
        backgroundSize:'cover',
        display:'inline-block',
        height:'100px',
        width:'100px',
        backgroundPosition:'top center',
    }

});

function Gallery(props){
    const {persons , classes, selectedImage} = props;
    const nWidth = Math.ceil(Math.sqrt(persons.length));
    const nHeight = Math.ceil(persons.length/nWidth);

    return (
        <div className={classes.root} style={{width:nWidth*100+'px',height:nHeight*100+'px'}}>
            {persons.map((person,idx) => (
                (idx===selectedImage)?
                <div className={classes.img} style={{backgroundImage:`url(${person.image})`}}></div>
                :
                <div className={classes.img} style={{backgroundImage:`url(${person.image})`,filter:'opacity(30%)'
            }}></div>

            ))}
            
           
        </div>


    );
}

export default withStyles(styles)(Gallery);