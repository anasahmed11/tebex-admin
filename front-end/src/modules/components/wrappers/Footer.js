import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Grid, Typography } from '@material-ui/core';
import globalVariables, { footerSections } from '../../../global-variables';

import IconLink from '../parts/IconLink';

import styles from '../../../assets/jss/components/wrappers/Footer';



const Footer = props => {

    const { classes } = props;
    const lang = globalVariables.LANG;

    return (
        <div className={classes.root}>
        <Grid container className={classes.footer}>
            {footerSections.map((section,idx) =>
                <div key={idx} className={classes.footerSection}>
                    <Typography variant='subtitle1' className={classes.sectionTitle}>
                        <b>{section.title[lang]}</b>
                    </Typography>
                    <ul className={classes.list}>
                        {section.links.map((item,idx) => 
                            <li key={idx} className={classes.listItem}>
                                <Link to={item.link} className={classes.footerLink}>
                                    <Typography className={classes.textStyle}>
                                        {item.title[lang]}
                                    </Typography>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
            <div  className={classes.footerSection}>
                <Typography variant='subtitle1' className={classes.sectionTitle}>
                            <b>{lang === 'en'? 'FOLLOW US' : 'تابعنا'}</b>
                </Typography>
                
                <Typography variant='subtitle1' display="inline"><IconLink icon='twitter'  href="https://twitter.com"/></Typography> 
                <Typography variant='subtitle1' display="inline"><IconLink icon='youtube'  href="https://youtube.com" /></Typography>
                <Typography variant='subtitle1' display="inline"><IconLink icon='linkedin' href="https://linkedin.com"/></Typography>
                <Typography variant='subtitle1' display="inline"><IconLink icon='facebook' href="https://facebook.com"/></Typography>
            </div>
        </Grid>
            <div>
                <Typography variant='subtitle1' className={classes.sectionTitle} align='center'>
                    {lang === 'en'?
                        '© 2019 UYC. All Rights Reserved.'
                        :'© 2019 UYC. جميع الحقوق محفوظة'}
                </Typography>
            </div>
        </div>
    );
}

export default withStyles(styles)(Footer);