import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { BeatLoader } from "react-spinners";

import { categoryAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/parts/BelowAppBar';

const HoverList = withStyles(styles)( props => {
    
    const { classes, cat } = props;

    return (
        <Paper className={classes.paper} elevation={1}>
           {/*<Typography variant="h5" component="h3">
                {cat.subtitle}
            </Typography>*/}
            <Grid container className={classes.hoverListContainer}>
                {cat.children.map(subCat => 
                    <div key={uuid()} className={classes.hoverListSection}>
                        <Typography variant='h6' className={classes.sectionTitle}>
                            <Link to={`shop/${cat.slug}/${subCat.slug}`} >
                                {subCat.name}
                            </Link>
                        </Typography>
                        {subCat.children?
                        <ul className={classes.list}>
                        {subCat.children.map(leafCat => <li key={uuid()}>
                                <Typography>
                                <Link className={classes.listLinkStyle} to={`shop/${cat.slug}/${subCat.slug}/${leafCat.slug}`} >
                                        {leafCat.name}
                                </Link>
                                </Typography>
                            </li>
                            )}
                        </ul> : null}
                    </div>
                )}
            </Grid>
        </Paper>
    );
  });

const Loading = (props) => <BeatLoader
                            css={`margin: auto 0px`}
                            sizeUnit={"px"}
                            color={'#fff'}
                            loading={true}
                        />
                
class BelowAppBar extends Component {

    state = {
        isLoading: true,
    }

    componentDidMount(){

        let en = globalVariables.LANG === 'en';

        categoryAPI.get('/')
        .then(res => {
            const categories = [];
            let mainCategories = res.data[0].children;
            for(let mainCat of mainCategories){
                const subs = [];
                for(let subCat of mainCat.children){
                    const leaves = [];
                    for(let leafCat of subCat.children){
                        leaves.push({
                        id: leafCat.id,
                        name: en? leafCat.name_en : leafCat.name,
                        subtitle:  en? leafCat.name_en : leafCat.name,
                        slug: leafCat.slug,
                        });
                    }
                    subs.push({
                        id: subCat.id,
                        name: en? subCat.name_en : subCat.name,
                        subtitle:  en? subCat.name_en : subCat.name,
                        slug: subCat.slug,
                        children: leaves,
                    });
                }
                categories.push({
                    id: mainCat.id,
                    name: en? mainCat.name_en : mainCat.name,
                    subtitle:  en? mainCat.name_en : mainCat.name,
                    slug: mainCat.slug,
                    children: subs,
                });
            }
            this.setState({
                categories: categories,
                isLoading: false,
            })
        })
        .catch(res => {
            console.log(res)
        })
    }

    render () {
        const { classes } = this.props;
        const { isLoading, categories } = this.state;

        return <Grid container justify='center' className={classes.root}>
                <Grid container item spacing={1} xs={10}>
                    {isLoading? <Loading /> : categories.map(cat => <Grid key={uuid()} className={classes.item}>
                        <Link className={classes.navLink} to={`shop/${cat.slug}`} >
                            {cat.name}
                        </Link>
                        {cat.children.length? <HoverList cat={cat} /> : null}
                    </Grid>)}
                </Grid>
            </Grid>
    }
}

BelowAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BelowAppBar);