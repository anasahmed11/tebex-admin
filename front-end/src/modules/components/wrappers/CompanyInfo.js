import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LinedTitle from '../parts/TwoLinesSectionTitle';

import { Link } from 'react-router-dom';

import styles from '../../../assets/jss/components/wrappers/CompanyInfo';

const CompanyInfo = props => {
    const { classes, info } = props;

    let joinUs = null;
    if (props.authenticated)
        joinUs = <Grid container item xs={11} justify="flex-end" alignItems='center'>
            <Grid item xs={5}>
                <Button size="large" variant="contained" color="secondary" component={Link} to={props.link} className={classes.button}>
                    <Typography variant="h6">
                        {
                            props.join?globalVariables.LABEL_JOIN_NOW[globalVariables.LANG]: globalVariables.LABEL_CHECK_ACCOUNT[globalVariables.LANG]
                        }
                        
                    </Typography>
                </Button>
            </Grid>
        </Grid>


    return <Grid container justify='center' alignItems='center' className={classes.root} >
        <LinedTitle>
            {globalVariables.HOME_AFFILIATE_TITLE[globalVariables.LANG]}
        </LinedTitle>
        <Grid container item lg={8} md={10} xs={11}>
            {info.map((item, idx) =>
                <Grid component={ScrollAnimation} container key={idx} animateIn="slideInUp" animateOnce={true}>
                    <section className={classes.infoSection}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={[item.icon.set, item.icon.name]} />
                        </div>
                        <div className={classes.infoText}>
                            <Typography align='left' className={classes.title} variant='h6'>{item.title[globalVariables.LANG]}</Typography>
                            <Typography align='left' className={classes.desc} variant='subtitle1'>{item.description[globalVariables.LANG]}</Typography>
                        </div>
                    </section>
                </Grid>
            )}
        </Grid>

        {joinUs}

    </Grid>
}


export default withStyles(styles)(CompanyInfo);