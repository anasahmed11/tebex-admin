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

import { locationAPI, governorateAPI } from '../../../api/api';

import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/parts/CheckoutForm';

class CheckoutForm extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        address: '',
        landmark: '',
        phone: '',
        email: '',
        notes: '',
        // COUNTRIES: [],
        // country: '',
        // CITIES: [],
        // city: '',
        // AREAS: [],
        // area: '',
        GOVERNORATE: [],
        governorate: '',
        city: '',
    }

    pendingPromises = [];

    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());

    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];

    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);


    // getCountries = (defaultCountry = '') => {
    //     const wrappedPromise = cancelablePromise(locationAPI.get('countries/'));
    //     this.appendPendingPromise(wrappedPromise);
    //     wrappedPromise
    //         .promise
    //         .then(res => { this.setState({ COUNTRIES: res.data, country: defaultCountry }) })
    //         .then(() => this.removePendingPromise(wrappedPromise))
    //         .catch(res => { })
    // }

    getGovernorate = () => {
        const wrappedPromise = cancelablePromise(governorateAPI.get('/'));
        this.appendPendingPromise(wrappedPromise);
        wrappedPromise
            .promise
            .then(res => { this.setState({ GOVERNORATE: res.data }) })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(res => { })

    }
    componentDidMount() {
        this.getGovernorate()
        // this.getCountries(1)
        // this.getCities(1)
    }
    onComponentUpdate = () => {
        if (this.props.edit) {
            this.setState({
                first_name: this.props.intialData.first_name,
                last_name: this.props.intialData.last_name,
                address: this.props.intialData.address,
                phone: this.props.intialData.phone,
                landmark: this.props.intialData.landmark,
                email: this.props.intialData.email,
                notes: this.props.intialData.notes,
                id: this.props.intialData.id,
                city: this.props.intialData.location.city_name !== undefined ? this.props.intialData.location.id : this.state.city,
                area: this.props.intialData.location.area_name !== undefined ? this.props.intialData.location.id : '',
            })
        }
    }
    handleEditAddress = (callbackFn) => {
        let data = { ...this.state }
        delete data.CITIES
        delete data.AREAS
        delete data.COUNTRIES
        if (data.area === '') delete data.area

        if (!this.verifyData()) {
            console.log("required field")
            return
        }

        const wrappedPromise = cancelablePromise(locationAPI.post('/' + this.state.id, data));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => { callbackFn(this.state.id, res.data) })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(res => { })

    }

    handleCreateAddress(callbackFn) {
        let data = { ...this.state }
        data.governorate_id = data.governorate
        delete data.GOVERNORATE
        delete data.governorate
        

        if (!this.verifyData()) {
            console.log("required field", data)
            return
        }
        const wrappedPromise = cancelablePromise(locationAPI.post('/', data));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => { callbackFn(res.data) })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(res => { })
    }

    verifyData = () => {
        return (
            this.state.first_name &&
            this.state.last_name &&
            this.state.address &&
            this.state.city &&
            this.state.governorate &&
            this.state.phone &&
            this.state.email
        )
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    // getCities = (country, defaultCity = '') => {
    //     const wrappedPromise = cancelablePromise(locationAPI.get('cities/' + country));
    //     this.appendPendingPromise(wrappedPromise);

    //     wrappedPromise
    //         .promise
    //         .then(res => { this.setState({ CITIES: res.data, city: defaultCity }) })
    //         .then(() => this.removePendingPromise(wrappedPromise))
    //         .catch(res => { })
    // }

    // handleCountryChange = prop => event => {
    //     this.setState({ [prop]: event.target.value }, () => this.getCities(event.target.value));


    // }

    // getAreas = (city, defaultArea = '') => {
    //     const wrappedPromise = cancelablePromise(locationAPI.get('areas/' + city));
    //     this.appendPendingPromise(wrappedPromise);

    //     wrappedPromise
    //         .promise
    //         .then(res => { this.setState({ AREAS: res.data, area: defaultArea }) })
    //         .then(() => this.removePendingPromise(wrappedPromise))
    //         .catch(res => { })

    // }
    // handleCityChange = prop => event => {
    //     this.setState({ [prop]: event.target.value }, () => this.getAreas(event.target.value));

    //     /*const wrappedPromise = cancelablePromise(locationAPI.get('areas/' + event.target.value));
    //     this.appendPendingPromise(wrappedPromise);

    //     wrappedPromise
    //         .promise
    //         .then(res => { this.setState({ AREAS: res.data, area: '' }) })
    //         .then(() => this.removePendingPromise(wrappedPromise))
    //         .catch(res => { })*/
    // }

    render() {
        const { classes, } = this.props
        return (

            <Dialog
                onEnter={this.onComponentUpdate}
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent style={{ overflow: 'hidden' }}>
                    {this.props.desc ?
                        <DialogContentText style={{ marginBottom: 4, }}>
                            {this.props.desc}
                        </DialogContentText> : null
                    }
                    <Grid container item justify="center" className={classes.root} xs={11} spacing={2}>

                        <Grid item sm={6} xs={12}>
                            <TextField
                                className={classes.margin}
                                id="outlined-first_name-input"
                                label={globalVariables.FORM_ADDRESS_LABEL_FIRST_NAME[globalVariables.LANG]}
                                type="text"
                                /*error={this.state.emailError?true:false}
                                helperText={this.state.emailError}*/
                                value={this.state.first_name}
                                onChange={this.handleChange('first_name')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                className={classes.margin}
                                id="outlined-last_name-input"
                                label={globalVariables.FORM_ADDRESS_LABEL_LAST_NAME[globalVariables.LANG]}
                                type="text"
                                /*error={this.state.emailError?true:false}
                                helperText={this.state.emailError}*/
                                value={this.state.last_name}
                                onChange={this.handleChange('last_name')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>


                        {
                        /*<Grid item xs={12}>
                            <TextField
                                className={classes.margin}
                                id="outlined-email-input"
                                select
                                label={globalVariables.FORM_ADDRESS_LABEL_COUNTRY[globalVariables.LANG]}
                                type="text"

                                value={this.state.country}
                                onChange={this.handleCountryChange('country')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            >
                                {this.state.COUNTRIES.map(option => (
                                    <MenuItem key={uuid()} value={option.id}>
                                        {option.country_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <ReactCSSTransitionGroup
                            component={Grid}
                            container
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                            transitionName="componentAddDelete"
                        >
                            {this.state.CITIES.length ?
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.margin}
                                        id="outlined-email-input"
                                        select
                                        label={globalVariables.FORM_ADDRESS_LABEL_CITY[globalVariables.LANG]}
                                        type="text"
                                        // error={this.state.emailError?true:false}
                                        // helperText={this.state.emailError}
                                        value={this.state.city}
                                        onChange={this.handleCityChange('city')}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    >
                                        {this.state.CITIES.map(option => (
                                            <MenuItem key={uuid()} value={option.id}>
                                                {option.city_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> : ''
                            }

                            {this.state.AREAS.length ?
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.margin}
                                        id="outlined-email-input"
                                        select
                                        label={globalVariables.FORM_ADDRESS_LABEL_AREA[globalVariables.LANG]}
                                        type="text"
                                        value={this.state.area}
                                        onChange={this.handleChange('area')}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    >
                                        {this.state.AREAS.map(option => (
                                            <MenuItem key={uuid()} value={option.id}>
                                                {option.area_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> : ''
                            }
                        </ReactCSSTransitionGroup>*/}



                        <Grid item xs={12}>
                            <TextField
                                className={classes.margin}
                                id="outlined-email-input"
                                select
                                label={globalVariables.FORM_ADDRESS_LABEL_COUNTRY[globalVariables.LANG]}
                                type="text"

                                value={this.state.governorate}
                                onChange={this.handleChange('governorate')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            >
                                {this.state.GOVERNORATE.map(option => (
                                    <MenuItem key={uuid()} value={option.id}>
                                        {option.governorate_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.margin}
                                id="outlined-appartment-input"
                                label={globalVariables.FORM_ADDRESS_LABEL_CITY[globalVariables.LANG]}
                                type="text"

                                value={this.state.city}
                                onChange={this.handleChange('city')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className={classes.margin}
                                id="outlined-appartment-input"
                                label={globalVariables.FORM_ADDRESS_LABEL_ADDRESS[globalVariables.LANG]}
                                type="text"

                                value={this.state.address}
                                onChange={this.handleChange('address')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                className={classes.margin}
                                id="outlined-appartment-input"
                                label={globalVariables.FORM_ADDRESS_LABEL_LAND_MARK[globalVariables.LANG]}
                                type="text"
                                /*error={this.state.emailError?true:false}
                                helperText={this.state.emailError}*/
                                value={this.state.landmark}
                                onChange={this.handleChange('landmark')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                className={classes.margin}
                                id="outlined-appartment-input"
                                label={globalVariables.FORM_ADDRESS_LABEL_PHONE[globalVariables.LANG]}
                                type="text"
                                /*error={this.state.emailError?true:false}
                                helperText={this.state.emailError}*/
                                value={this.state.phone}
                                onChange={this.handleChange('phone')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.margin}
                                id="outlined-email-input"
                                label={globalVariables.FORM_ADDRESS_LABEL_EMAIL[globalVariables.LANG]}
                                type="email"
                                /*error={this.state.emailError?true:false}
                                helperText={this.state.emailError}*/
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.margin}
                                id="outlined-notes-input"
                                label={globalVariables.FORM_ADDRESS_LABEL_NOTE[globalVariables.LANG]}
                                type="text"
                                /*error={this.state.emailError?true:false}
                                helperText={this.state.emailError}*/
                                value={this.state.notes}
                                onChange={this.handleChange('notes')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                                rows="4"
                            />
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
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