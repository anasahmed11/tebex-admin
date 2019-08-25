import React from 'react';
import { ClipLoader } from 'react-spinners';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Snackbar, } from '@material-ui/core';


import MySnackbar from '../parts/MySnackbar';
import MyClipLoader from '../parts/MyClipLoader';

import SellerForm from '../parts/SellerForm';
import { userAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/wrappers/AffiliateRegisteration';

class SellerRegisteration extends React.Component {
    state = {
        isLoading: false,
        isPopup: false,
    }
    
    handleFormSubmition = (data) => {
        this.setState({isLoading:true})
        userAPI.post('program/seller',data)
        .then(res=>{
            this.props.handleNextStep()
            this.setState({isLoading:false})
        })
        .catch(err=>{
            this.setState({isLoading:false, isPopup:true})
        })
    }

    handlePopupClose = () => {
        this.setState({isPopup:false})
    }

    render(){
        const {classes} = this.props;
        const {isLoading} = this.state;
        return(
            <React.Fragment>
                <MyClipLoader isLoading={isLoading} />
                
                <Snackbar
                    style={{direction:'ltr', bottom:'50px'}}   
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.isPopup}
                    autoHideDuration={6000}
                    onClose={this.handlePopupClose}
                >
                    <MySnackbar 
                        className={classes.margin}
                        onClose={this.handlePopupClose}
                        variant={globalVariables.TYPE_ERROR}
                        message={globalVariables.MSG_NETWORK_ERROR[globalVariables.LANG]}
                    />
                </Snackbar>
                
                <SellerForm handleFormSubmition={this.handleFormSubmition} />

                
            </React.Fragment>

        );
    }



}


export default withStyles(styles)(SellerRegisteration);