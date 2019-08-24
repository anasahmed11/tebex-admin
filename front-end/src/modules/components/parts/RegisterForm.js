import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Typography, Grid, Button, TextField, MenuItem } from '@material-ui/core';

import { registerUser } from '../../../store/actions/auth';

import styles from '../../../assets/jss/components/parts/RegisterForm';
import { initCart } from '../../../store/actions/shoppingCart';
import { initUser } from '../../../store/actions/user';

const cookies = new Cookies();

const GENDER = [
    { value: 'M', label: 'ذكر' },
    { value: 'F', label: 'انثى' }
]


class Register extends React.Component {
    state = {
        email: '',
        emailError: '',
        password: '',
        passError: '',
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        gender: 'M',
        phone: "",
        birthday: '2000-01-01',
    }

    handleRegister = () => {

        let emailError = "";
        let passwordError = "";
        let firstnameError = "";
        let lastnameError = "";
        let valid = true;
        if (!this.validateEmail(this.state.email)) {
            emailError = "البريد الالكتروني غير صحيح";
            valid = false;
        }
        if (!this.validatePassword(this.state.password)) {
            passwordError = "يجب ان يحتوي الرقم السري على اكثر من 6 احرف";
            valid = false;
        }
        if (!this.validateUsername(this.state.firstName)) {
            firstnameError = "الاسم غير صحيح";
            valid = false;
        }
        if (!this.validateUsername(this.state.lastName)) {
            lastnameError = "الاسم غير صحيح";
            valid = false;
        }
        this.setState({
            emailError: emailError,
            passError: passwordError,
            firstNameError: firstnameError,
            lastNameError: lastnameError
        })


        const data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password,
            phone: this.state.phone,
            gender: this.state.gender,
            birth_date: this.state.birthday,
            referral: cookies.get(globalVariables.AFFILIATE_COOKIE) !== undefined ? cookies.get(globalVariables.AFFILIATE_COOKIE) : 0
        };

        if (valid) {
            const callBacks = [() => this.props.handleInitCart(), () => this.props.handleInitUser(), () => this.props.history.push('/')]
            this.props.onRegister(data, callBacks);
        }
    }


    validateEmail = (email) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);

    validatePassword = (password) => password.length > 6;

    validateUsername = (username) => /^[a-zA-Z0-9]+$/.test(username);


    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
        const { classes } = this.props;

        const { email, phone, first_name, last_name, password } = this.props.registerErrors;
        return (
            <Grid container component="form" onSubmit={(e)=>{e.preventDefault(); this.handleRegister();}} justify='center'>
                <Grid item xs={12} className={classes.paddingTop}>
                    <Typography component="h6" variant="h6" gutterBottom>{globalVariables.FORM_REGISTER_LABEL_TITLE[globalVariables.LANG]}</Typography>
                </Grid>

                <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        className={classes.margin}
                        id="register-email"
                        label={globalVariables.FORM_REGISTER_LABEL_EMAIL[globalVariables.LANG]}
                        type="email"
                        autoComplete="email"
                        error={(this.state.emailError || email) ? true : false}
                        helperText={this.state.emailError || email}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        className={classes.margin}
                        id="register-password"
                        value={this.state.password}
                        required
                        label={globalVariables.FORM_REGISTER_LABEL_PASSWORD[globalVariables.LANG]}
                        type="password"
                        autoComplete="current-password"
                        error={this.state.passError || password ? true : false}
                        helperText={this.state.passError || password}
                        onChange={this.handleChange('password')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        className={classes.margin}
                        id="register-firstname"
                        label={globalVariables.FORM_REGISTER_LABEL_FIRST_NAME[globalVariables.LANG]}
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        required
                        error={this.state.firstNameError || first_name ? true : false}
                        helperText={this.state.firstNameError || first_name}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        className={classes.margin}
                        id="register-lastname"
                        label={globalVariables.FORM_REGISTER_LABEL_LAST_NAME[globalVariables.LANG]}
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        required
                        error={this.state.lastNameError || last_name ? true : false}
                        helperText={this.state.lastNameError || last_name}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        id="register-phone"
                        label={globalVariables.FORM_REGISTER_LABEL_PHONE[globalVariables.LANG]}
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                        className={classes.margin}
                        error={this.state.phoneError || phone ? true : false}
                        helperText={this.state.phoneError || phone}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        id="register-sex"
                        select
                        label={globalVariables.FORM_REGISTER_LABEL_SEX[globalVariables.LANG]}
                        className={classes.textField}
                        value={this.state.gender}
                        onChange={this.handleChange('gender')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {GENDER.map(option => (
                            <MenuItem key={uuid()} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="register-birthdate"
                        label={globalVariables.FORM_REGISTER_LABEL_BIRTHDAY[globalVariables.LANG]}
                        type="date"
                        value={this.state.birthday}
                        className={classes.margin}
                        onChange={this.handleChange('birthday')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>


                <Grid item xs={12} className={classes.paddingTop}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleRegister}
                    >
                        {globalVariables.FORM_REGISTER_LABEL_REGISTER[globalVariables.LANG]}
                    </Button>
                </Grid>


            </Grid>
        );

    }
}


const mapStateToProps = state => {
    return {
        registerErrors: state.auth.registerErrors,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (data, callBacks) => dispatch(registerUser(data, callBacks)),
        handleInitCart: () => dispatch(initCart()),
        handleInitUser: () => dispatch(initUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));