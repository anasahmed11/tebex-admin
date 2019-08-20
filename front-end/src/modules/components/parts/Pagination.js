import React from 'react';

import { Link, } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, createMuiTheme, CssBaseline, makeStyles, } from '@material-ui/core';
import 'typeface-roboto';

import Order from '../parts/Order';
import { orderAPI } from '../../../api/api'
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from './styles/Pagination';
import Pagination from "material-ui-flat-pagination";


import { ThemeProvider } from '@material-ui/styles';



function MyPagination(props){
    const {classes} = props;
    return <Pagination
            style={{width:'100%', backgroundColor:'#247BA0' ,textAlign:'center', display:'flex'}}
            limit={props.limit}
            offset={(props.current_page - 1) * props.limit}
            total={props.total}
            onClick={(e, offset) => props.handleClick(offset/props.limit + 1)}
            size='small'
            currentPageColor='primary'
            otherPageColor='primary'
            reduced
            classes={{
                textPrimary: classes.textPrimary, 
                label: classes.label,
                rootStandard: classes.root,
                rootCurrent: classes.rootCurrent,
                rootEllipsis: classes.root,
                rootEnd: classes.root
            }}
        />
}

export default withStyles(styles)(MyPagination);