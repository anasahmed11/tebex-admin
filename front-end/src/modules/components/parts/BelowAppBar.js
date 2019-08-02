import React, { Component } from 'react';
import { withStyles, Link, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import uuid from 'uuid';

const styles = theme => ({
    root: {
        backgroundColor: 'purple',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    linksBar: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    item: {
        marginRight: '24px',
        position: 'relative',
        paddingTop: '14px',
        paddingBottom: '14px',
        '&:hover > div': {
            visibility: 'visible',
            opacity: 1,
        }
    },
    navLink: {
        position: 'inherit',
        fontFamily: "'Droid Arabic Kufi', 'Roboto'",
        fontSize: '20px',
        transition: theme.transitions.create(),
        color: 'white',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'pink',
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '5%',
            height: '3px',
            transition: theme.transitions.create(),
            backgroundColor: 'yellow',
            marginBottom: theme.spacing(-0.5),
            opacity: 0,
        },
        '&:hover:after': {
            opacity: 1,
        },
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        position: 'absolute',
        zIndex: 10,
        right: 0,
        top: '82%',
        left:'0px',
        width: '400px',
        transition: theme.transitions.create(),
        visibility: 'hidden',
        opacity: 0,
    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: '0px 4px 0px 0px',
      },
    listItem: {
        paddingTop: theme.spacing(1), //it was theme.spacing.unit / 2
        paddingBottom: theme.spacing(1),//it was theme.spacing.unit / 2
    },
    // footer
    footer: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        }
    },
    // footerSection
    footerSection: {
        flex: '0 0 calc(50% - 4px)',
        marginBottom: theme.spacing(2),
    },
    footerLink: {
        color: 'blue',
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

function PaperSheet(props) {
    const { classes, category } = props;
  
    return (
        <Paper className={classes.paper} elevation={1}>
            {/*<Typography variant="h5" component="h3">
                {category.subtitle}
            </Typography>*/}
            <Grid container className={classes.footer}>
                {Object.keys(category.links).map(cat => 
                    <div key={uuid()} className={classes.footerSection}>
                        <Typography variant='h6' className={classes.sectionTitle}>
                                    {cat}
                        </Typography>
                        <ul className={classes.list}>
                            {Object.keys(category.links[cat]).map(subcat => 
                                <FooterLink key={uuid()} link={'shop/' + category.slug + '/' + subcat} text={category.links[cat][subcat]} liStyle={classes.listItem} textStyle={classes.footerLink} />
                            )}
                        </ul>
                    </div>
                )}
            </Grid>
        </Paper>
    );
  }

const HoverList = withStyles(styles)(PaperSheet);

class BelowAppBar extends Component {

    state = {
    }

    render() {
        
        const props = this.props;
        const { classes } = props;

        const links = (props.links.map((item, idx) => 
            <Grid key={uuid()} className={classes.item}>
                <Link className={classes.navLink} href={'shop/'+item.slug} >
                    {item.title}
                </Link>
                <HoverList category={item} />
            </Grid>
        ));

        return  <Grid container justify='center' className={classes.root}>
                    <Grid container item spacing={1} xs={10}>
                        {links}
                    </Grid>
                </Grid>
    }
}

BelowAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BelowAppBar);