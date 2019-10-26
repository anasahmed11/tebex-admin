import React from 'react';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Snackbar, Typography, } from '@material-ui/core';

import MySnackbar from '../parts/MySnackbar';
import PackageCard from '../parts/PackageCard';
import AffiliateForm from '../parts/AffiliateForm';

import { userAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/wrappers/AffiliateRegisteration';
import MyClipLoader from '../parts/MyClipLoader';


const packages = [
    { color: "#5d6a9a", title: 'Silver', price: '1000', border: '#474f6f', id: 3 }, 
    { color: "#eac80d", title: 'gold', price: '3000', border: '#bfa30c', id: 5 }, 
    { color: "#1abc9c", title: 'bronze', price: 'Free', border: '#18937b', id: 1 }
];

class AffiliateRegisteration extends React.Component {
    state = {
        isLoading: false,
        isPopup: false,
        pack: 2,
    }

    handleFormSubmition = (data) => {
        this.setState({ isLoading: true })
        if(!this.state.pack){
            this.setState({ 
                isLoading: false,
                packError: 'Please Select a Package', 
            })
            return;
        }
        data.plan_id = this.state.pack
        userAPI.post('program/affiliate', data)
            .then(res => {
                this.props.handleNextStep()
                this.setState({ isLoading: false })
            })
            .catch(err => {
                this.setState({ isLoading: false, isPopup: true })
            })
    }
    handlePackageSelection = (id) => {
        this.setState({ pack: id })
    }

    handlePopupClose = () => this.setState({ isPopup: false });

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return (

            <React.Fragment>
                 
                <MyClipLoader isLoading={isLoading} />
                <Snackbar
                    style={{ bottom: '50px' }}
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

                <Grid container justify='center' className={classes.root} spacing={1}>
                    <Grid item xs = {12} className = {classes.title}>
                        <Typography component = "h6" variant = "h6" gutterBottom>{globalVariables.FORM_REGISTER_LABEL_TITLE[globalVariables.LANG]}</Typography>
                    </Grid>

                    {
                        packages.map((pack, idx) => <Grid item lg={4} md={9} xs={9}>
                            <PackageCard
                                color={pack.color}
                                border={pack.border}
                                title={pack.title}
                                price={pack.price}
                                selected={this.state.pack === pack.id}
                                id={pack.id}
                                key={pack.id}
                                handleCardSelected={this.handlePackageSelection}
                                features={globalVariables.Package2_AFFILIATE[globalVariables.LANG]} />
                        </Grid>)
                    }
                    <div>
                        <Typography style={{color:'red'}}>
                            {this.state.packError}
                        </Typography>
                    </div>
                    
                </Grid>

                <AffiliateForm handleFormSubmition={this.handleFormSubmition} />

            </React.Fragment>

        );
    }
}

export default withStyles(styles)(AffiliateRegisteration);