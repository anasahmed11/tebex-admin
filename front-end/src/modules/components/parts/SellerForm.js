import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Typography, Grid, Button, TextField, MenuItem } from '@material-ui/core';



const styles = theme => ({
    margin: {margin: theme.spacing.unit * 2,},
    paddingTop:{padding: '10px 0px'},
    textField: {
        margin: theme.spacing.unit * 2,
        width: '200',
      },
});


const PACKAGE = [
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'}
]



class SellerForm extends React.Component{
    state={
        vodafone: '',
        etisalat:'',
        storeURL:'',
        storeAddres:'',
        pickupAddress:'',
        pickupPhone:'',
        
        
    }

    handleRegister = () => {
        
        const data = {
            vodafone: this.state.vodafone,
            etisalat:this.state.etisalat,
            package:this.state.package,
        };

        this.props.handleFormSubmition(data)
    }


    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };


    render(){
        const {classes} = this.props;
        return(

            <Grid container justify='center' style={{textAlign:'center'}}>
                
                <Grid item xs = {12} className = {classes.paddingTop}>
                    <Typography component = "h6" variant = "h6" gutterBottom>{globalVariables.FORM_REGISTER_LABEL_TITLE[globalVariables.LANG]}</Typography>
                </Grid>
                
                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "vodafone-cash121"
                        label = {globalVariables.FORM_SELLER_LABEL_VODAFONE[globalVariables.LANG]}
                        value = {this.state.vodafone}
                        onChange = {this.handleChange('vodafone')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_ETISALAT[globalVariables.LANG]}
                        value = {this.state.etisalat}
                        onChange = {this.handleChange('etisalat')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>    


                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_STORE_URL[globalVariables.LANG]}
                        value = {this.state.storeURL}
                        onChange = {this.handleChange('storeURL')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>    


                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_STORE_ADDRESS[globalVariables.LANG]}
                        value = {this.state.storeAddress}
                        onChange = {this.handleChange('storeAddress')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>    


                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_PICKUP_ADDRESS[globalVariables.LANG]}
                        value = {this.state.pickupAddress}
                        onChange = {this.handleChange('pickupAddress')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>    

                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_PICKUP_PHONE[globalVariables.LANG]}
                        value = {this.state.pickupPhone}
                        onChange = {this.handleChange('pickupPhone')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    />
                </Grid>    

                
                <Grid item xs = {6} className = {classes.paddingTop}>
                    <Button 
                        variant = "contained"
                        color = "primary"
                        className = {classes.button} 
                        onClick = {this.handleRegister}
                        fullWidth
                    >
                        {globalVariables.FORM_REGISTER_LABEL_REGISTER[globalVariables.LANG]}
                    </Button>
                </Grid>
                        
            </Grid>
        );
    }


}


export default withStyles(styles)(SellerForm);