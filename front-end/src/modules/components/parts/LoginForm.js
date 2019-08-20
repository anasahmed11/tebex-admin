import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import globalVariables from '../../../global-variables';

import {
    Grid, Button, Checkbox, TextField, Typography,
    InputAdornment, FormControlLabel, IconButton, withStyles
} from '@material-ui/core';

import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';

import { loginUser } from '../../../store/actions/auth';

import styles from '../../../assets/jss/components/parts/LoginForm';
import { initCart } from '../../../store/actions/shoppingCart';
import { initUser } from '../../../store/actions/user';

class Login extends React.Component {

    state = {
        email: '',
        emailError: '',
        password: '',
        passError: '',
        showPassword: false,
        rememberme: true,
    }

    handleChange = prop => event => {
        if (event.target.value === "checkbox") {
            this.setState({ [prop]: event.target.checked });
            return
        }
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !this.state.showPassword }));
    };


    validateEmail = (email) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)

    validatePassword = (password) => password.length > 6

    validateUsername = (username) => /^[a-zA-Z0-9]+$/.test(username)

    handleLogin = () => {

        let emailError = "";
        let passwordError = "";
        let valid = true;
        if (!this.validateEmail(this.state.email)) {
            emailError = globalVariables.FORM_LOGIN_ERR_EMAIL[globalVariables.LANG];
            valid = false;
        }
        if (!this.validatePassword(this.state.password)) {
            passwordError = globalVariables.FORM_LOGIN_ERR_PASS[globalVariables.LANG];
            valid = false;
        }
        this.setState({ emailError: emailError, passError: passwordError })
        console.log(valid)
        if (valid) {
            const callBacks = [() => this.props.handleInitCart(), () => this.props.handleInitUser(), () => this.props.history.push('/')]
            this.props.onLogin(this.state.email, this.state.password, this.state.rememberme, callBacks)

        }
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container justify='center'>

                <Grid item xs={12} className={classes.paddingTop}>
                    <Typography component="h6" variant="h6" gutterBottom>{globalVariables.FORM_LOGIN_LABEL_TITLE[globalVariables.LANG]}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.paddingTop}>

                    <TextField
                        className={classes.margin}
                        id="outlined-email-input"
                        label={globalVariables.FORM_LOGIN_LABEL_EMAIL[globalVariables.LANG]}
                        type="email"
                        error={this.state.emailError ? true : false}
                        helperText={this.state.emailError}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle
                                        style={{ padding: "0px 5px" }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />

                </Grid>
                <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        className={classes.margin}
                        id="outlined-adornment-password"
                        value={this.state.password}
                        required
                        error={this.state.passError ? true : false}
                        helperText={this.state.passError}
                        label={globalVariables.FORM_LOGIN_LABEL_PASS[globalVariables.LANG]}
                        type={this.state.showPassword ? 'text' : 'password'}
                        onChange={this.handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        style={{ padding: "0px 5px" }}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>

                <Grid item xs={12} className={classes.paddingTop}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.rememberme}
                                onChange={this.handleChange('rememberme')}
                                value='checkbox'
                            />
                        }
                        label={globalVariables.FORM_LOGIN_LABEL_REMEMBER[globalVariables.LANG]}
                    />

                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleLogin}>
                        {globalVariables.FORM_LOGIN_LABEL_LOGIN[globalVariables.LANG]}
                    </Button>


                </Grid>
                <Grid item xs={12} className={classes.paddingTop}>
                    <Link to='/'>{globalVariables.FORM_LOGIN_LABEL_FORGOT[globalVariables.LANG]}</Link>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password, rememberme, callBacks) => dispatch(loginUser(email, password, rememberme, callBacks)),
        handleInitCart: () => dispatch(initCart()),
        handleInitUser: () => dispatch(initUser()),
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));