import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MySnackbar from '../modules/components/parts/MySnackbar';
import {closePopup} from '../store/actions/site'; 


function PopupMessage(props) {
    const {isPopup, message, messageType, handlePopupClose} = props;
    return <Snackbar
                style={{bottom:'50px'}}   
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={isPopup}
                autoHideDuration={6000}
                onClose={handlePopupClose}
            >
                <MySnackbar 
                    onClose={handlePopupClose}
                    variant={messageType}
                    message={message}
                />
            </Snackbar>
}


const mapStateToProps = state => {
    return {
        message: state.site.message,
        messageType: state.site.messageType,
        isPopup: state.site.isPopup,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handlePopupClose: () => dispatch(closePopup()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PopupMessage));