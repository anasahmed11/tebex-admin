// Add before a div to provide a background image for it.
import React from 'react';
import { withStyles } from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

const styles = theme => ({
    backStyle: {
        backgroundSize: 'unset',
        width: '100%',
        padding:'10px 0px',
    },
});

function BackgroundBluredImage(props){
    const {classes, heightL, heightSM, blur} = props;
    const matches = useMediaQuery('(min-width:959px)');
    const height  = matches? heightL : heightSM;
    const style = {
        background: 'url(' + props.img + ') no-repeat center center fixed',
        filter: props.blur? `blur(${blur})` : 'blur(2px)',
        height: height,
    };
    return <div style={style} className={classes.backStyle} />
}

export default withStyles(styles)(BackgroundBluredImage);