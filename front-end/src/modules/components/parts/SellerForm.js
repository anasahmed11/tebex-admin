import React from 'react';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Typography, Grid, Button, TextField, MenuItem } from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/SellerForm';

const PAYMENT = [
    {value: 0, label: globalVariables.FORM_AFFILIATE_LABEL_VODAFONE[globalVariables.LANG]},
    {value: 1, label: globalVariables.FORM_AFFILIATE_LABEL_ETISALAT[globalVariables.LANG]},
    {value: 2, label: globalVariables.FORM_AFFILIATE_LABEL_Bank[globalVariables.LANG]}
]

class SellerForm extends React.Component{
    state = {
        storeNameAr: '',
        storeNameEn: '',
        storeURL: '',
        storeAddress: '',
        storeEmail: '',
        storeSlug: '',
        itemType: '',
        storePhone: '',
        
        vodafone: '',
        etisalat: '',

        swiftCode: '',
        bemeficiaryName: '',
        bankName: '',
        bankAccountNumber: '',
        
        payment: 0,
        
        error:false,
        
    }

    getPaymentForm = () => {
        const {classes} = this.props;
        switch(this.state.payment){
            case 0:
                return  <Grid item xs = {12} className = {classes.paddingTop}>
                            <TextField
                                className = {classes.margin}
                                id = "vodafone-cash12221"
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
                                id = "etisalat-cash121221"
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
                                id = "etisalat-cash121221"
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
                                id = "etisalat-cash12131e1"
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
                                id = "etisalat-dfs"
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
                                id = "etisalat-cash1dsdd211"
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
        const paymentData = this.getPaymentData()
        let valid = true

        const data = {
            name: this.state.storeNameAr,
            name_en: this.state.storeNameEn,
            url: this.state.storeURL,
            type: this.state.itemType,
            address: this.state.storeAddress,
            phone: this.state.storePhone,
            email: this.state.storeEmail,
            slug: this.state.storeSlug,
            method: this.state.payment===2?'Bank':'Cash',
            account: JSON.stringify(paymentData),
        };

        Object.keys(data).forEach(key=>{
            if(data[key]==="") valid=false;
        })
        
        Object.keys(paymentData).forEach(key=>{
            if(paymentData[key]==="") valid=false;
        })

        console.log(data)
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
                    <Typography component = "h6" variant = "h6" gutterBottom>{globalVariables.FORM_REGISTER_LABEL_TITLE[globalVariables.LANG]}</Typography>
                </Grid>
                

                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_NAME[globalVariables.LANG]}
                        value = {this.state.storeNameAr}
                        onChange = {this.handleChange('storeNameAr')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                        required
                        error={this.state.error}
                    />
                </Grid>    

                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_NAME_EN[globalVariables.LANG]}
                        value = {this.state.storeNameEn}
                        onChange = {this.handleChange('storeNameEn')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                        required
                        error={this.state.error}
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
                        required
                        error={this.state.error}
                    />
                </Grid>    

                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_ITEMS[globalVariables.LANG]}
                        value = {this.state.itemType}
                        onChange = {this.handleChange('itemType')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                        required
                        error={this.state.error}
                        helperText="ex: accessories - phones - laptops - shirts ..."
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
                        required
                        error={this.state.error}
                    />
                </Grid>    


              

                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_PICKUP_PHONE[globalVariables.LANG]}
                        value = {this.state.storePhone}
                        onChange = {this.handleChange('storePhone')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                        required
                        error={this.state.error}
                    />
                </Grid>    


                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_STORE_EMAIL[globalVariables.LANG]}
                        value = {this.state.storeEmail}
                        onChange = {this.handleChange('storeEmail')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                        required
                        error={this.state.error}
                    />
                </Grid>    


                <Grid item xs = {12} className = {classes.paddingTop}>
                    <TextField
                        className = {classes.margin}
                        id = "etisalat-cash1211"
                        label = {globalVariables.FORM_SELLER_LABEL_STORE_SLUG[globalVariables.LANG]}
                        value = {this.state.storeSlug}
                        onChange = {this.handleChange('storeSlug')}
                        InputLabelProps = {{
                            shrink: true,
                        }}
                        required
                        error={this.state.error}
                    />
                </Grid>    
                



                
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