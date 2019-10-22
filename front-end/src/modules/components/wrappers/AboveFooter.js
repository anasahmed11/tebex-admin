import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import LinedTitle from '../parts/TwoLinesSectionTitle';

import styles from '../../../assets/jss/components/wrappers/AboveFooter';
import globalVariables from '../../../global-variables';

const AboveFooter = props => {
    const { classes, info } = props;
    let joinUs = null;
    if (props.authenticated)
        joinUs = <Grid container item xs={11} justify="center" alignItems='center'>
                <Button size="large" variant="contained" color="secondary" component={Link} to={props.link} className={classes.button}>
                    <Typography variant="h6">
                        {props.join?globalVariables.LABEL_JOIN_NOW[globalVariables.LANG]: globalVariables.LABEL_CHECK_ACCOUNT[globalVariables.LANG]}
                    </Typography>
                </Button>
        </Grid>

    return <Grid container justify='center' alignItems='center' className={classes.root} >
        <LinedTitle style={{ color: 'navy' }}>
            {globalVariables.HOME_SELLER_TITLE[globalVariables.LANG]}
        </LinedTitle>
        <Grid container justify="space-around" item md={10} xs={11}>
            {info.map((item, idx) =>
                <ScrollAnimation
                    className={classes.sectionContainer}
                    key={idx}
                    animateIn="fadeIn"
                    animateOnce={true}
                >
                    <section className={classes.infoSection}>
                        <div className={classes.iconContainer}>
                            <Typography variant="h1"> <FontAwesomeIcon className={classes.icon} icon={[item.icon.set, item.icon.name]} /></Typography>
                        </div>
                        <div className={classes.infoText}>
                            <Typography align='center' className={classes.title} variant='h6' gutterBottom>
                                <b>{item.title[globalVariables.LANG]}</b>
                            </Typography>
                            <Typography align='center' className={classes.desc} variant='subtitle1'>{item.description[globalVariables.LANG]}</Typography>
                        </div>
                    </section>
                </ScrollAnimation>
            )}
        </Grid>

        {joinUs}

    </Grid>
}


export default withStyles(styles)(AboveFooter);