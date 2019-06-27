import React from 'react';
import { connect } from 'react-redux';

import { 
    Grid, Button, Checkbox, TextField, Typography, InputAdornment, FormControlLabel, IconButton, withStyles, 
} from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff} from '@material-ui/icons';

import { loginUser } from '../../../store/actions/auth'


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    paddingTop:{
        padding:'10px 0px'
    },  
});



class Login extends React.Component{

    state = {
        email: '',
        emailError: '',
        password: '',
        passError: '',
        showPassword: false,
        rememberme: true,
        
    }

    handleChange = prop => event => {
        if(prop === "rememberme"){
            this.setState({ [prop]: event.target.checked });
            return
        }
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !this.state.showPassword }));
    };
    

    validateEmail = (email) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
    
    validatePassword = (password) => password.length>6
    
    validateUsername = (username) => /^[a-zA-Z0-9]+$/.test(username)
    
    handleLogin = () => {
        
        let emailError = "";
        let passwordError = "";
        let valid = true;
        if(!this.validateEmail(this.state.email)){
            emailError = "البريد الالكتروني غير صحيح";
            valid = false;
        }
        if(!this.validatePassword(this.state.password)){
            passwordError = "يجب ان يحتوي الرقم السري على اكثر من 6 احرف";
            valid = false;
        }
        this.setState({emailError:emailError, passError:passwordError})
        
        if(valid) this.props.onLogin(this.state.email,this.state.password,this.state.rememberme)
    }

    render(){
        const { classes } = this.props
        return(
            <Grid container justify='center'>
        
                <Grid item xs={12} className={classes.paddingTop}>
                    <Typography component="h6" variant="h6" gutterBottom>تسجيل الدخول</Typography>
                </Grid>
                <Grid item xs={12} className={classes.paddingTop}>
                
                        <TextField
                            className={classes.margin}
                            id="outlined-email-input"
                            label="البريد الالكتروني"
                            type="email"
                            error={this.state.emailError?true:false}
                            helperText={this.state.emailError}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle 
                                            style = {{padding:"0px 5px"}}
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
                        error={this.state.passError?true:false}
                        helperText={this.state.passError}
                        label="كلمة السر"
                        type={this.state.showPassword ? 'text' : 'password'}
                        onChange={this.handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    style = {{padding:"0px 5px"}}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} className={classes.paddingTop}>
                
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleLogin}>
                        تسجيل الدخول
                    </Button>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.rememberme}
                                onChange={this.handleChange('rememberme')}
                                value={this.state.rememberme}
                            />
                        }
                        label="تذكرني"
                    />
                    
                </Grid>
                <Grid item xs={12} className={classes.paddingTop}>
                    هل نسيت كلمة المرور؟
                </Grid>   
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (email,password,rememberme) => dispatch(loginUser(email,password,rememberme)),
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));