import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LinedTitle from '../parts/TwoLinesSectionTitle';

import styles from '../../../assets/jss/components/wrappers/CompanyInfo';

const CompanyInfo = props => {

        const { classes, info } = props;

        return <Grid container justify='center' alignItems='center' className={classes.root} >
                <LinedTitle>
                    {globalVariables.LABEL_HOME_INFO[globalVariables.LANG]}
                </LinedTitle>
                <Grid container item lg={8} md={10} xs={11}>
                    {info.map(item =>
                    <ScrollAnimation  key={uuid()} animateIn="slideInUp" animateOnce={true}>
                        <section className={classes.infoSection}>
                            <div className={classes.iconContainer}>
                                <FontAwesomeIcon className={classes.icon} icon={[item.icon.set, item.icon.name]} />
                            </div>
                            <div className={classes.infoText}>
                                <Typography align='left' className={classes.title} variant='h6'>{item.title}</Typography>
                                <Typography align='left' className={classes.desc} variant='subtitle1'>{item.description}</Typography>
                            </div>
                        </section>
                    </ScrollAnimation>
                    )}
                </Grid>
            </Grid>
}


export default withStyles(styles)(CompanyInfo);