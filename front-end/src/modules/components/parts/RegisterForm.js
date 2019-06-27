import React from 'react';
import {connect} from 'react-redux';
import { withStyles, Typography, Grid, Button, TextField, MenuItem } from '@material-ui/core';
import uuid from 'uuid';

import { registerUser } from '../../../store/actions/auth';


const styles = theme => ({
    margin: {margin: theme.spacing.unit * 2,},
    paddingTop:{padding: '10px 0px'},
    textField: {
        margin: theme.spacing.unit * 2,
        width: '200',
      },
});


function createLevels() {
    let levels=[]
    for (let i = 1; i <= 8; i++)
        levels.push({value: '' + i, label: 'المستوى ' + i})
    return levels;
}

const GENDER = [
    {value: 'M', label: 'ذكر'},
    {value: 'F', label: 'انثى'}
]


class Register extends React.Component{
    state={
        email: '',
        emailError: '',
        password: '',
        passError: '',
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        level: '1',
        gender: 'M',
        birthday: '2000-01-01',
    }

    handleRegister = () => {
      
        let emailError = "";
        let passwordError = "";
        let firstnameError = "";
        let lastnameError = "";
        let valid = true;
        if(!this.validateEmail(this.state.email)){
            emailError = "البريد الالكتروني غير صحيح";
            valid = false;
        }
        if(!this.validatePassword(this.state.password)){
            passwordError = "يجب ان يحتوي الرقم السري على اكثر من 6 احرف";
            valid = false;
        }
        if(!this.validateUsername(this.state.firstName)){
            firstnameError = "الاسم غير صحيح";
            valid = false;
        }
        if(!this.validateUsername(this.state.lastName)){
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
            level: this.state.level,
            gender: this.state.gender,
            birth_date: this.state.birthday,
        };

        if(valid)
            this.props.onRegister(data);
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

    render(){
        const {classes} = this.props;
        return(
            <Grid container justify = 'center'>
                <Grid item xs = {12} className = {classes.paddingTop}>
                    <Typography component = "h6" variant = "h6" gutterBottom> انشاء حساب</Typography>
                </Grid>

                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "register-email"
                        label = "البريد الالكتروني"
                        type = "email"
                        autoComplete = "email"
                        error = {this.state.emailError?true:false}
                        helperText = {this.state.emailError}
                        value = {this.state.email}
                        onChange = {this.handleChange('email')}
                        required
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "register-password"
                        value = {this.state.password}
                        required
                        label = "كلمة السر"
                        type = "password"
                        autoComplete = "current-password"
                        error = {this.state.passError?true:false}
                        helperText = {this.state.passError}
                        onChange = {this.handleChange('password')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "register-firstname"
                        label = " الاسم الاول"
                        value = {this.state.firstName}
                        onChange = {this.handleChange('firstName')}
                        required
                        error = {this.state.firstNameError?true:false}
                        helperText = {this.state.firstNameError}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "register-lastname"
                        label = "الاسم الاخير"
                        value = {this.state.lastName}
                        onChange = {this.handleChange('lastName')}
                        required
                        error = {this.state.lastNameError?true:false}
                        helperText = {this.state.lastNameError}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        id = "register-phone"
                        label = "رقم الهاتف"
                        value = {this.state.phone}
                        onChange = {this.handleChange('phone')}
                        type = "number"
                        className = {classes.margin}
                        error = {this.state.phoneError?true:false}
                        helperText = {this.state.phoneError}
                        required
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs = {12} className = {classes.paddingTop}>
                   <TextField
                        id = "register-level"
                        select
                        label = "مستوى الحساب"
                        className = {classes.margin}
                        value = {this.state.level}
                        onChange = {this.handleChange('level')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    >
                        {createLevels().map(option => (
                            <MenuItem key = {uuid()} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id = "register-sex"
                        select
                        label = "الجنس"
                        className = {classes.textField}
                        value = {this.state.gender}
                        onChange = {this.handleChange('gender')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    >
                        {GENDER.map(option => (
                            <MenuItem key = {uuid()} value = {option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id = "register-birthdate"
                        label = "Birthday"
                        type = "date"
                        value = {this.state.birthday}
                        className = {classes.margin}
                        onChange = {this.handleChange('birthday')}
                        InputLabelProps = {{
                            shrink: true,
                          }}
                    />
                </Grid>

               
                <Grid item xs = {12} className = {classes.paddingTop}>
                    <Button 
                        variant = "contained"
                        color = "primary"
                        className = {classes.button} 
                        onClick = {this.handleRegister}
                    >
                        تسجيل الحساب
                    </Button>
                </Grid>
            
                
            </Grid>
        );

    }
}

const mapDispatchToProps = dispatch => {
    return{
        onRegister: (data) => dispatch(registerUser(data)),
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Register));