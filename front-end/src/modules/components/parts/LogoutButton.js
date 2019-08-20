import React from 'react';
import {connect} from 'react-redux';

import { Button, withStyles, Snackbar } from '@material-ui/core';

import { logoutUser, closePopup } from '../../../store/actions/auth';
import { initCart } from '../../../store/actions/shoppingCart';
import { initUser } from '../../../store/actions/user';

import MySnackbar from './MySnackbar';

const styles = theme => ({});

class LogoutButton extends React.Component{

    handleLogout = (handleRedirect) => {
        const callBacks = [() => this.props.handleInitCart(), () => this.props.handleInitUser(), handleRedirect]
        this.props.handleLogout(callBacks)
        
        
    }
    render(){
        const {classes, handlePopupClose, messageType, serverMessage, isPopup, handleRedirect} = this.props
        
        return(
                <Button onClick={() => this.handleLogout(handleRedirect)} fullWidth>
                    <Snackbar
                        style={{direction:'ltr', bottom:'50px'}}   
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={isPopup}
                        autoHideDuration={6000}
                        onClose={handlePopupClose}
                    >
                        <MySnackbar 
                            className={classes.margin}
                            onClose={handlePopupClose}
                            variant={messageType}
                            message={serverMessage}
                        />
                    
                    </Snackbar>
                    {this.props.children}
                </Button>
        );
    }
}

const mapStateToProps = state => {
    return {
        serverMessage: state.auth.message,
        isPopup: state.auth.popup,
        messageType: state.auth.messageType
    }
}

const mapDispatchToProps = dispatch => {
    return{
        handleLogout: (callBacks) => dispatch(logoutUser(callBacks)),
        handlePopupClose: () => dispatch(closePopup()),
        handleInitCart: () => dispatch(initCart()),
        handleInitUser: () => dispatch(initUser()),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(LogoutButton))