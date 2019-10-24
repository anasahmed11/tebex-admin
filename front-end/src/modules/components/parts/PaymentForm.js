import React from 'react';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, TextField, MenuItem, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { paymentAPI } from '../../../api/api';

import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/parts/CheckoutForm';

const PAYMENT = [
    {value: 0, label: globalVariables.FORM_AFFILIATE_LABEL_VODAFONE[globalVariables.LANG]},
    {value: 1, label: globalVariables.FORM_AFFILIATE_LABEL_ETISALAT[globalVariables.LANG]},
    {value: 2, label: globalVariables.FORM_AFFILIATE_LABEL_Bank[globalVariables.LANG]}
]

class CheckoutForm extends React.Component {

    state = {
        vodafone: '',
        etisalat: '',

        swiftCode: '',
        bemeficiaryName: '',
        bankName: '',
        bankAccountNumber: '',

        payment: 0,
    }

    pendingPromises = [];

    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());

    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];

    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);


    
    componentDidMount() {
       
    }
    onComponentUpdate = () => {
        if (this.props.edit) {
            this.setState({
                vodafone: this.props.intialData.vodafone,
                etisalat: this.props.intialData.etisalat,
                swiftCode: this.props.intialData.swiftCode,
                bemeficiaryName: this.props.intialData.bemeficiaryName,
                bankName: this.props.intialData.bankName,
                bankAccountNumber: this.props.intialData.bankAccountNumber,
                payment: this.props.intialData.payment,
                
            })
        }
    }
    // handleEditAddress = (callbackFn) => {
    //     let data = { ...this.state }
    //     delete data.CITIES
    //     delete data.AREAS
    //     delete data.COUNTRIES
    //     if (data.area === '') delete data.area

    //     if (!this.verifyData()) {
    //         console.log("required field")
    //         return
    //     }

    //     const wrappedPromise = cancelablePromise(locationAPI.post('/' + this.state.id, data));
    //     this.appendPendingPromise(wrappedPromise);

    //     wrappedPromise
    //         .promise
    //         .then(res => { callbackFn(this.state.id, res.data) })
    //         .then(() => this.removePendingPromise(wrappedPromise))
    //         .catch(res => { })

    // }
    getPaymentForm = () => {
        const { classes } = this.props;
        switch (this.state.payment) {
            case 0:
                return <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        className={classes.margin}
                        id="vodafone-cash12221"
                        label={globalVariables.FORM_AFFILIATE_LABEL_VODAFONE[globalVariables.LANG]}
                        value={this.state.vodafone}
                        onChange={this.handleChange('vodafone')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={this.state.error}
                        required
                    />
                </Grid>
            case 1:
                return <Grid item xs={12} className={classes.paddingTop}>
                    <TextField
                        className={classes.margin}
                        id="etisalat-cash121221"
                        label={globalVariables.FORM_AFFILIATE_LABEL_ETISALAT[globalVariables.LANG]}
                        value={this.state.etisalat}
                        onChange={this.handleChange('etisalat')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={this.state.error}
                        required
                    />
                </Grid>
            default:
                return <React.Fragment>
                    <Grid item xs={12} className={classes.paddingTop}>
                        <TextField
                            className={classes.margin}
                            id="etisalat-cash121221"
                            label="Bemeficiary Name"
                            value={this.state.bemeficiaryName}
                            onChange={this.handleChange('bemeficiaryName')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={this.state.error}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.paddingTop}>
                        <TextField
                            className={classes.margin}
                            id="etisalat-cash12131e1"
                            label="Bank Account Number"
                            value={this.state.bankAccountNumber}
                            onChange={this.handleChange('bankAccountNumber')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={this.state.error}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.paddingTop}>
                        <TextField
                            className={classes.margin}
                            id="etisalat-dfs"
                            label="Bank Name"
                            value={this.state.bankName}
                            onChange={this.handleChange('bankName')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={this.state.error}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} className={classes.paddingTop}>
                        <TextField
                            className={classes.margin}
                            id="etisalat-cash1dsdd211"
                            label={"Swift Code"}
                            value={this.state.swiftCode}
                            onChange={this.handleChange('swiftCode')}
                            InputLabelProps={{
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
        switch (this.state.payment) {
            case 0:
                return {
                    vodafone_cash: this.state.vodafone
                }
            case 1:
                return {
                    etisalat_cash: this.state.etisalat
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

    handleCreateAddress(callbackFn) {
        console.log("creating payment")
        let valid = true
        const paymentData = this.getPaymentData()
        const data = {
            method: this.state.payment===2?'Bank':'Cash',
            account: JSON.stringify(paymentData),
        };
        Object.keys(paymentData).forEach(key=>{
            if(paymentData[key]==="") valid=false;
        })
        if (valid){
            const wrappedPromise = cancelablePromise(paymentAPI.post('/', data));
            this.appendPendingPromise(wrappedPromise);

            wrappedPromise
                .promise
                .then(res => {
                    res.data.account = JSON.parse(res.data.account) 
                    callbackFn(res.data) 
                })
                .then(() => this.removePendingPromise(wrappedPromise))
                .catch(res => { })
        }
          
    }

 

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

   
    
    render() {
        const { classes, } = this.props
        return (

            <Dialog
                onEnter={this.onComponentUpdate}
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{globalVariables.FORM_REGISTER_LABEL_TITLE[globalVariables.LANG]}</DialogTitle>
                <DialogContent style={{ overflow: 'hidden' }}>
                    {this.props.desc ?
                        <DialogContentText style={{ marginBottom: 4, }}>
                            {this.props.desc}
                        </DialogContentText> : null
                    }
                    <Grid container component="form" onSubmit={(e) => { e.preventDefault(); this.handleCreateAddress(this.props.formAction) }} justify='center' style={{ textAlign: 'center' }}>
                        <Grid item container xs={12} sm={10} md={8} lg={6}>
                            <Grid item xs={12} className={classes.paddingTop}>
                                <TextField
                                    id="register-payment-way-1212"
                                    select
                                    label={globalVariables.FORM_AFFILIATE_LABEL_PAYMENT_METHOD[globalVariables.LANG]}
                                    className={classes.textField}
                                    value={this.state.payment}
                                    onChange={this.handleChange('payment')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {PAYMENT.map(option => (
                                        <MenuItem key={uuid()} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Grid>

                            {this.getPaymentForm()}
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="secondary" variant="contained">
                        {globalVariables.FORM_ADDRESS_LABEL_BACK[globalVariables.LANG]}
                    </Button>
                    {this.props.edit ?
                        <Button
                            onClick={() => this.handleEditAddress(this.props.formEditAction)}
                            color="primary"
                            variant="contained"
                        >
                            {globalVariables.LABEL_EDIT[globalVariables.LANG]}
                        </Button>
                        :
                        <Button
                            onClick={() => this.handleCreateAddress(this.props.formAction)}
                            color="primary"
                            variant="contained"
                        >
                            {globalVariables.FORM_ADDRESS_LABEL_OK[globalVariables.LANG]}
                        </Button>
                    }
                </DialogActions>
            </Dialog>

        );
    }
}


export default withStyles(styles)(CheckoutForm)