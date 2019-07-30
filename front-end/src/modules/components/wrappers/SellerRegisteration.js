import React from 'react';
import { ClipLoader } from 'react-spinners';

import { withStyles, Grid, Snackbar, } from '@material-ui/core';

import MySnackbar from '../parts/MySnackbar';


import { styles } from '../../../assets/jss/wrappers/AffiliateReg';
import globalVariables from '../../../global-variables';
import SellerForm from '../parts/SellerForm';
import { userAPI } from '../../../api/api';

class AffiliateRegisteration extends React.Component {
    state = {
        isLoading: false,
        isPopup: false,
    }
    
    handleFormSubmition = (data) => {
        this.setState({isLoading:true})
        userAPI.post('program/seller',data)
        .then(res=>{
            this.props.handleNextStep()
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
                }
            </React.Fragment>

        );
    }



}


export default withStyles(styles)(AffiliateRegisteration);