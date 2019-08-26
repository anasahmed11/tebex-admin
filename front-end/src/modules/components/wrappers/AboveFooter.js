import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import uuid from 'uuid';

import { withStyles, Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import LinedTitle from '../parts/TwoLinesSectionTitle';

import styles from '../../../assets/jss/components/wrappers/AboveFooter';

const AboveFooter = props => {

        const { classes, info } = props;

        return <Grid container justify='center' alignItems='center' className={classes.root} >
                <Grid container justify="space-around" item md={10} xs={11}>
                    {info.map(item =>
                        <ScrollAnimation
                            className={classes.sectionContainer}
                            key={uuid()} 
                            animateIn="fadeIn" 
                            animateOnce={true}
                        >
                        <section className={classes.infoSection}>
                            <div className={classes.iconContainer}>
                                <FontAwesomeIcon className={classes.icon} icon={[item.icon.set, item.icon.name]} />
                            </div>
                            <div className={classes.infoText}>
                                <Typography align='center' className={classes.title} variant='h6' gutterBottom>
                                    <b>{item.title}</b>
                                </Typography>
                                <Typography align='center' className={classes.desc} variant='subtitle1'>{item.description}</Typography>
                            </div>
                        </section>
                        </ScrollAnimation>
                    )}
                </Grid>
            </Grid>
}


export default withStyles(styles)(AboveFooter);