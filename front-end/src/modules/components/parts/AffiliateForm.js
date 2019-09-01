import React from 'react';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Typography, Grid, Button, TextField, MenuItem } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/AffiliateForm';

const PACKAGE = [
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'}
]

const PAYMENT = [
    {value: 0, label: globalVariables.FORM_AFFILIATE_LABEL_VODAFONE[globalVariables.LANG]},
    {value: 1, label: globalVariables.FORM_AFFILIATE_LABEL_ETISALAT[globalVariables.LANG]},
    {value: 2, label: globalVariables.FORM_AFFILIATE_LABEL_Bank[globalVariables.LANG]}
]


class AffiliateForm extends React.Component{
    state = {
        vodafone: '',
        etisalat: '',
        //package: 1,
        swiftCode: '',
        bemeficiaryName: '',
        bankName: '',
        bankAccountNumber: '',
        payment: 0,
        error: false
    }

    getPaymentForm = () => {
        const {classes} = this.props;
        switch(this.state.payment){
            case 0:
                return  <Grid item xs = {12} className = {classes.paddingTop}>
                            <TextField
                                className = {classes.margin}
                                id = "vodafone-cash121"
                                label = {globalVariables.FORM_AFFILIATE_LABEL_VODAFONE[globalVariables.LANG]}
                                value = {this.state.vodafone}
                                onChange = {this.handleChange('vodafone')}
                                InputLabelProps = {{
                                    shrink: true,
                                }}
                                error={this.state.error}
                                required
                            />
                        </Grid>
            case 1:
                return <Grid item xs = {12} className = {classes.paddingTop}>
                            <TextField
                                className = {classes.margin}
                                id = "etisalat-cash1211"
                                label = {globalVariables.FORM_AFFILIATE_LABEL_ETISALAT[globalVariables.LANG]}
                                value = {this.state.etisalat}
                                onChange = {this.handleChange('etisalat')}
                                InputLabelProps = {{
                                    shrink: true,
                                }}
                                error={this.state.error}
                                required
                            />
                        </Grid>    
            default:
                return <React.Fragment>
                        <Grid item xs = {12} className = {classes.paddingTop}>
                            <TextField
                                className = {classes.margin}
                                id = "etisalat-cash1211"
                                label = "Bemeficiary Name"
                                value = {this.state.bemeficiaryName}
                                onChange = {this.handleChange('bemeficiaryName')}
                                InputLabelProps = {{
                                    shrink: true,
                                }}
                                error={this.state.error}
                                required
                            />
                        </Grid>    
                        <Grid item xs = {12} className = {classes.paddingTop}>
                            <TextField
                                className = {classes.margin}
                                id = "etisalat-cash1211"
                                label = "Bank Account Number"
                                value = {this.state.bankAccountNumber}
                                onChange = {this.handleChange('bankAccountNumber')}
                                InputLabelProps = {{
                                    shrink: true,
                                }}
                                error={this.state.error}
                                required
                            />
                        </Grid>    
                        <Grid item xs = {12} className = {classes.paddingTop}>
                            <TextField
                                className = {classes.margin}
                                id = "etisalat-cash1211"
                                label = "Bank Name"
                                value = {this.state.bankName}
                                onChange = {this.handleChange('bankName')}
                                InputLabelProps = {{
                                    shrink: true,
                                }}
                                error={this.state.error}
                                required
                            />
                        </Grid>    

                        <Grid item xs = {12} className = {classes.paddingTop}>
                            <TextField
                                className = {classes.margin}
                                id = "etisalat-cash1211"
                                label = {"Swift Code"}
                                value = {this.state.swiftCode}
                                onChange = {this.handleChange('swiftCode')}
                                InputLabelProps = {{
                                    shrink: true,
                                }}
                                error={this.state.error}
                                required
                            />
                        </Grid>    

                </React.Fragment>               
        }
    }

    getPaymentData = () => {
        switch(this.state.payment){
            case 0:
                return {
                    vodafone_cash:this.state.vodafone
                }
            case 1:
                return {
                    etisalat_cash:this.state.etisalat
                }
            default:
                return {
                    swift_code: this.state.swiftCode,
                    bemeficiary_name: this.state.bemeficiaryName,
                    bank_name: this.state.bankName,
                    bank_account_number: this.state.bankAccountNumber,
                }
        }
    }

    handleRegister = () => {
        let valid = true
        const paymentData = this.getPaymentData()
        const data = {
            account: JSON.stringify(paymentData),            
            plan_id: this.state.package,
            method: this.state.payment===2?'Bank':'Cash'
        };
        console.log(data);

        Object.keys(paymentData).forEach(key=>{
            if(paymentData[key]==="") valid=false;
        })

        if(valid)
            this.props.handleFormSubmition(data)
        else this.setState({error:true})
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
                    <TextField
                        id = "register-payment-way-1212"
                        select
                        label = {globalVariables.FORM_AFFILIATE_LABEL_PAYMENT_METHOD[globalVariables.LANG]}
                        className = {classes.textField}
                        value = {this.state.payment}
                        onChange = {this.handleChange('payment')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    >
                        {PAYMENT.map(option => (
                            <MenuItem key = {uuid()} value = {option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                   
                </Grid>  

               {this.getPaymentForm()}

                {/* {<Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        id = "register-package12312"
                        select
                        label = {globalVariables.FORM_AFFILIATE_LABEL_PACKAGE[globalVariables.LANG]}
                        className = {classes.textField}
                        value = {this.state.package}
                        onChange = {this.handleChange('package')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                    >
                        {PACKAGE.map(option => (
                            <MenuItem key = {uuid()} value = {option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                   
                </Grid>}   */}


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

export default withStyles(styles)(AffiliateForm);