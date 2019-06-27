import React from 'react';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import * as globalVariables from '../../global-variables';

import { withStyles, Grid, Button, Hidden, Divider, Snackbar, } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';

import {closePopup} from '../../store/actions/auth'

import Login from '../components/parts/LoginForm';
import Register from '../components/parts/RegisterForm';
import MySnackbar from '../components/parts/MySnackbar';

import { styles } from '../../assets/jss/views/Auth';

class Auth extends React.Component {
    state = {
        loginView: true,        
    }

    handleSwitchAuth = () =>{
        this.setState({
            loginView: !this.state.loginView
        });
    }


    render(){
        const {classes, isLoading, isPopup, serverMessage, messageType, handlePopupClose} = this.props;
        if(messageType === globalVariables.TYPE_SUCCESS)
            setTimeout(() => {
                this.props.history.push(this.props.redirectPath);
                window.location.reload();
            }, 3000)
        
        return (
            <Grid container justify='center' className={classes.root}>
                {isLoading?
                    <div className={classes.sweetLoading}>
                        <div className={classes.spinner}>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={isLoading}
                            />
                        </div>
                    </div>
                    : null
                }
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


                <Grid item  md={4} sm={12}>
                   {(this.state.loginView)? <Route component={Login} /> : <Register />}
                </Grid>
                
                <Hidden smDown>
                    <Grid item  md={1} sm={false} className={classes.dividerWord}>
                        أو
                    </Grid>
                    <Grid item  md={1} sm={false} className={classes.dividerLine}>
                    </Grid>
                </Hidden>

                <Divider />

                <Grid item  md={4} sm={12}>
                    <Grid container justify='center' className={classes.root}>
                        <Grid item xs={12}>
                            <Button 
                                variant="contained" 
                                style={{
                                    width:"max-content",
                                    padding:"20px"
                                }} 
                                onClick={this.handleSwitchAuth}
                            >   
                                <OpenInNew style={{padding:"0px 10px"}}  /> 
                                {(this.state.loginView)?"انشاء حساب":"تسجيل الدخول"}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            

            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        serverMessage: state.auth.message,
        isPopup: state.auth.popup,
        messageType: state.auth.messageType,
        redirectPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        handlePopupClose: () => dispatch(closePopup()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth));