import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Grid, Typography } from '@material-ui/core';
import globalVariables from '../../../global-variables';

import IconLink from '../parts/IconLink';

import styles from '../../../assets/jss/components/wrappers/Footer';

const footerSections = [
    {
        title: {en: 'ABOUT UYC', ar: 'عن UYC'},
        links: [
            {
                title: {en: 'Who We Are?', ar: 'من نحن؟'},
                link: '/about'
            },
            {
                title: {en: 'Our Goals', ar: 'اهدافنا'},
                link: '/goals'
            },
            {
                title: {en: 'FAQ', ar: 'اسألة شائعة'},
                link: '/faq'
            },
            {
                title: {en: 'Contact Us', ar: 'تواصل معنا'},
                link: '/contact-us'
            }
        ]
    },
    {
        title: {en: 'WORK WITH US', ar: 'إعمل معنا'},
        links: [
            {
                title: {en: 'Sell Your Products', ar: 'بيع منتجاتك'},
                link: '/sell'
            },
            {
                title: {en: 'Affiliate Program', ar: 'التسويق بالعمولة'},
                link: '/affiliate'
            },
            {
                title: {en: 'Advertising', ar: 'الإعلانات'},
                link: '/advertising'
            },
        ]
    },
    {
        title: {en: 'OUR POLICY', ar: 'سياسات الشركة'},
        links: [
            {
                title: {en: 'Privacy Policy', ar: 'سياسة الخصوصية'},
                link: '/privacy-policy'
            },
            {
                title: {en: 'Terms and Conditions', ar: 'الشروط والأحكام'},
                link: '/terms-and-conditions'
            },
            {
                title: {en: 'Return Policy', ar: 'سياسة الإسترجاع'},
                link: '/return-policy'
            },
        ]
    },
]

const Footer = props => {

    const { classes } = props;
    const lang = globalVariables.LANG;

    return (
        <div className={classes.root}>
        <Grid container className={classes.footer}>
            {footerSections.map(section =>
                <div className={classes.footerSection}>
                    <Typography variant='subtitle1' className={classes.sectionTitle}>
                                <b>{section.title[lang]}</b>
                    </Typography>
                    <ul className={classes.list}>
                        {section.links.map(item => 
                            <li className={classes.listItem}>
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
                <IconLink icon='twitter'  href="https://twitter.com"/>
                <IconLink icon='youtube'  href="https://youtube.com" />
                <IconLink icon='linkedin' href="https://linkedin.com"/>
                <IconLink icon='facebook' href="https://facebook.com"/>
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