import React from 'react';
import {Typography, ButtonBase, withStyles } from '@material-ui/core';
import uuid from 'uuid';

const styles = theme => ({
   
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing.unit * 2,
        width: '80%',
        justifyContent:'space-between',
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
        },
    },
    
    image: {
        position: 'relative',
        overflow: 'hidden',
        height: 500,
        marginLeft: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 1,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 300,
            
            marginRight: theme.spacing.unit * 1,
            marginBottom: theme.spacing.unit * 1,
            
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
            '& $imageSrc': {
                transform: 'scale(1.2)',
            }
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        transition: theme.transitions.create(['all'], {duration: '0.8s'})
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});


function LargeCards(props){
   

    const { classes, items } = props;
    
    return (
        
            <div className={classes.root}>
                {items.map((item,idx) => (    
                    <ButtonBase
                        focusRipple
                        key={uuid()}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        onClick={() => alert('تحويل ..')}
                        style={{flex:
                                (items.length %3=== 1 && idx < items.length - 4)
                                || (items.length %3=== 2 && idx < items.length - 2)
                                || items.length %3 === 0 ?
                                '1 1 calc(33% - 10px)':'1 1 calc(50% - 8px)',}}
                    >

                        <span className={classes.imageSrc} style={{backgroundImage: `url(${item.url})`,}} />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                                {item.name}
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                ))}                    
            </div>
    );
}



export default withStyles(styles)(LargeCards);