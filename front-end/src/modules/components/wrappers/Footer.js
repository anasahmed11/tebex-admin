import React from 'react';

import { withStyles, Grid, Typography, Link } from '@material-ui/core';

import IconLink from '../parts/IconLink';

import styles from '../../../assets/jss/components/wrappers/Footer';

function FooterLink(props){
    return <li className={props.liStyle}>
                <Link href={props.link}>
                    <Typography className={props.textStyle}>
                        {props.text}
                    </Typography>
                </Link>
            </li>
}

const Footer = props => {

    const { classes } = props;
    const part = (
        <div className={classes.footerSection}>
            <Typography variant='subtitle1' className={classes.sectionTitle}>
                        سياسة المعلومات
            </Typography>
            <ul className={classes.list}>
                <FooterLink link='#' text='ازيك يسطا' liStyle={classes.listItem} textStyle={classes.footerLink} />
                <FooterLink link='#' text='الحمدلله كويس' liStyle={classes.listItem} textStyle={classes.footerLink} />
            </ul>
        </div>
    );
    return (
        <div className={classes.root}>
        <Grid container className={classes.footer}>
            {part}
            {part}
            {part}
            <div  className={classes.footerSection}>
                <Typography variant='subtitle1' className={classes.sectionTitle}>
                            تابعنا
                </Typography>
                <IconLink icon='twitter'  href="https://twitter.com"/>
                <IconLink icon='youtube'  href="https://youtube.com" />
                <IconLink icon='linkedin' href="https://linkedin.com"/>
                <IconLink icon='facebook' href="https://facebook.com"/>
            </div>
        </Grid>
            <div>
                <Typography variant='subtitle1' className={classes.sectionTitle} align='center'>
                    تم الهبد بواسطة الأشباح الهبيدة 2018 ©
                </Typography>
            </div>
        </div>
    );
}

export default withStyles(styles)(Footer);