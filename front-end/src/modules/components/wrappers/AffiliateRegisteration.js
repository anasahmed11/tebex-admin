import React from 'react';
import { ClipLoader } from 'react-spinners';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Snackbar, } from '@material-ui/core';

import MySnackbar from '../parts/MySnackbar';
import PackageCard from '../parts/PackageCard';
import AffiliateForm from '../parts/AffiliateForm';

import { userAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/wrappers/AffiliateRegisteration';
import MyClipLoader from '../parts/MyClipLoader';

class AffiliateRegisteration extends React.Component {
    state = {
        isLoading: false,
        isPopup: false,
    }

    handleFormSubmition = (data) => {
        this.setState({ isLoading: true })

        userAPI.post('program/affiliate', data)
            .then(res => {
                this.props.handleNextStep()
                this.setState({ isLoading: false })
            })
            .catch(err => {
                this.setState({ isLoading: false, isPopup: true })
            })
    }

    handlePopupClose = () => this.setState({ isPopup: false });

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return (

            <React.Fragment>
                <MyClipLoader isLoading={isLoading} />
                <Snackbar
                    style={{ direction: 'ltr', bottom: '50px' }}
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

                    <Grid item lg={3} xs={7}>
                        <PackageCard color="darkgray" title='2' price="1000" features={globalVariables.Package2_AFFILIATE[globalVariables.LANG]} />

                    </Grid>

                    <Grid item lg={4} xs={8}>
                        <PackageCard color="gold" title='1' big={true} price="3000" features={globalVariables.Package1_AFFILIATE[globalVariables.LANG]} />

                    </Grid>

                    <Grid item lg={3} xs={7}>
                        <PackageCard color="#cd7f32" title='3' price={globalVariables.LABEL_FREE[globalVariables.LANG]} features={globalVariables.Package3_AFFILIATE[globalVariables.LANG]} />

                    </Grid>

                </Grid>

                <AffiliateForm handleFormSubmition={this.handleFormSubmition} />

            </React.Fragment>

        );
    }
}

export default withStyles(styles)(AffiliateRegisteration);