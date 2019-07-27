import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { withStyles, Grid, Button, Hidden, Divider, Snackbar, Paper, } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';

import MySnackbar from '../parts/MySnackbar';


import { styles } from '../../../assets/jss/wrappers/AffiliateReg';
import globalVariables from '../../../global-variables';
import PackageCard from '../parts/PackageCard';
import SellerForm from '../parts/SellerForm';

class AffiliateRegisteration extends React.Component {
    state = {
        isLoading:false
    }
    handleFormSubmition = () => {
        this.setState({isLoading:true})
        /*
        axios
        
        .then(res=>{
            this.props.handleNextStep()
        })
        */
    }

    render(){
        const {classes} = this.props;
        const {isLoading} = this.state;
        return(
            <React.Fragment>
                {isLoading?
                    <Grid container alignItems="center" justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                    </Grid> :
                    <React.Fragment>
                        
                       

                       <SellerForm handleFormSubmition={this.handleFormSubmition} />
                        
                    

                    </React.Fragment>
                }
            </React.Fragment>

        );
    }



}


export default withStyles(styles)(AffiliateRegisteration);