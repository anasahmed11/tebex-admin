import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, Paper, TextField, Button, InputAdornment, IconButton, FormControl, Input } from '@material-ui/core';
import globalVariables from '../../../global-variables';

import {connect} from 'react-redux';

import 'font-awesome/css/font-awesome.min.css';

import {  withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        height: 'fit-content',
        flexGrow: 1,
    },
    textHead:{
        fontWeight:'500',
        marginBottom: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    },
    icon: {
        margin: theme.spacing(1),
    },
});

class UserDashBoard extends React.Component{
    state ={
        url:'',
        affiliateLink: '',
        aff:{},
    }
    
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleLinkBuilder = () => {
        try{
            
        const url = new URL(this.state.url)
        url.searchParams.set(globalVariables.AFFILIATE_PARAM,this.props.user.id)
        this.setState({affiliateLink: url.href})

        }
        catch{

        }
    }

    copyToClipboard = () => {
        var textField = document.createElement('textarea')
        textField.innerText = this.state.affiliateLink
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }
    render(){
        const {classes, } = this.props;
        
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.LINK_GENERATOR_TITLE[globalVariables.LANG]}</Typography>
                </Grid>
                
                <Grid container item spacing={8}>
                    <Grid item xs={12}>
                        <Paper className={classes.root} elevation={1} >
                            <Typography component='h3' variant="h6">
                                {globalVariables.LINK_GENERATOR_PUT[globalVariables.LANG]}
                            </Typography>
                            <TextField
                                style={{direction:'ltr'}}
                                id="URL_textField"
                                label={globalVariables.LABEL_URL[globalVariables.LANG]}
                                placeholder={globalVariables.LABEL_URL[globalVariables.LANG]}
                                className={classes.textField}
                                margin="normal"
                                value={this.state.url}
                                onChange={this.handleChange('url')}
                                fullWidth
                            />

                            <Grid container justify="flex-end">
                                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleLinkBuilder}>
                                    {globalVariables.LABEL_BUILD[globalVariables.LANG]}
                                </Button>
                            </Grid>
                            
                        </Paper>
                    </Grid>


                    {this.state.affiliateLink?
                        <Grid item xs={12}>
                            <Paper className={classes.root} elevation={1} >
                                <Typography component='h3' variant="title">
                                        {globalVariables.LINK_GENERATOR_AFFILIATE_LINK[globalVariables.LANG]}
                                    </Typography>



                                    <FormControl fullWidth style={{direction:'ltr'}} >
                                        
                                        <Input
                                            id="URL_textField"
                                            multiline
                                            className={classes.textField}
                                            margin="normal"
                                            value={this.state.affiliateLink}
                                            onChange={this.handleChange('affiliateLink')}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="copytocClipboradIcon"
                                                        onClick={this.copyToClipboard}
                                                    >
                                                        <FontAwesomeIcon className={classes.icon} icon="copy" />
                                                        
                                                        
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                            </Paper>
                            
                            
                        </Grid>:null
                        
                    }
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user, 
    }
}




export default withRouter(connect(mapStateToProps)(withStyles(styles)(UserDashBoard)));

