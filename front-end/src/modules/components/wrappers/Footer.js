import React from 'react';
import { withStyles, Grid, Typography, Link } from '@material-ui/core';
import IconLink from '../parts/IconLink';

const styles = theme => ({
    root: {
        backgroundColor: 'gray',
    },
    footer: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        }
    },
    footerSection: {
        marginBottom: theme.spacing.unit * 2,
        [theme.breakpoints.down('sm')]: {
            flex: '1 0 50%',
        },
        [theme.breakpoints.down('xs')]: {
            flex: '1 0 100%',
        },
    },
    sectionTitle: {
        color: 'white',
    },
    list: {
        margin: 0,
        listStyle: 'none',
        paddingLeft: 0,
      },
    listItem: {
        paddingTop: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit / 2,
    },
    footerLink: {
        color: 'lightblue',
    }
});

function FooterLink(props){
    return <li className={props.liStyle}>
                <Link href={props.link}>
                    <Typography className={props.textStyle}>
                        {props.text}
                    </Typography>
                </Link>
            </li>
}
function Footer(props){

    const {classes} = props;
    const ass = (
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
            {ass}
            {ass}
            {ass}
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