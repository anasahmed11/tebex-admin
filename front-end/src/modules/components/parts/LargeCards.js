import React from 'react';
import {Typography, ButtonBase, withStyles } from '@material-ui/core';
import uuid from 'uuid';

import styles from '../../../assets/jss/components/parts/LargeCards';


const LargeCards = props => {

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