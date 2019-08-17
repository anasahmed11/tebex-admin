import React, { Component } from 'react';
import uuid from 'uuid';

import { withStyles, Link, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import styles from '../../../assets/jss/components/parts/BelowAppBar';

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