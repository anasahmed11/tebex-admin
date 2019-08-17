import React from 'react';
import { ClipLoader } from 'react-spinners';
import globalVariables from '../../../global-variables';

import { Typography, withStyles, Grid, Button, } from '@material-ui/core';
import 'typeface-roboto';

import CheckoutForm from '../parts/CheckoutForm';
import AddressCard from '../parts/MiniTable';
import ButtonCard from '../parts/TextButtonCard';

import { locationAPI as axios } from '../../../api/api';
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/CheckoutAddress';

class CheckoutAddress extends React.Component {
    state = {
        addForm: false,
        selectedAddress: 0,
        addresses: [],
        isLoading: true
    }

    pendingPromises = [];

    componentWillUnmount = () => this.pendingPromises.map(p => p.cancel());

    appendPendingPromise = promise => this.pendingPromises = [...this.pendingPromises, promise];

    removePendingPromise = promise => this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    componentDidMount() {
        const wrappedPromise = cancelablePromise(axios.get('/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => { this.setState({ addresses: res.data, isLoading: false }) })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            });
    }

    addressClickHandler = idx => this.setState({ selectedAddress: idx });

    addAddressDialogToggle = () => {
        const dialog = this.state.addForm;
        this.setState({
            addForm: !dialog,
        });
    }

    formActionHandler = obj => {
        this.addAddressDialogToggle();
        const { addresses } = this.state;
        addresses.push(obj)
        this.setState({
            addresses: addresses,
        });
    }

    handleDelete = (id) => {
        let addresses = [...this.state.addresses]
        const wrappedPromise = cancelablePromise(axios.get(`${id}/delete`));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => {
                const idx = addresses.findIndex(item => item.id === id)
                addresses.splice(idx, 1)
                this.setState({ addresses: addresses })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(res => {
            });
    }

    handleNextButton = callbackFunction => callbackFunction(this.state.addresses[this.state.selectedAddress]);

    render() {
        const { classes } = this.props;
        const { addresses, isLoading } = this.state;
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Typography inline gutterBottom component='h2' variant='h5'>{globalVariables.CHECKOUT_SHIPPING_ADDRESS[globalVariables.LANG]}</Typography>
                </Grid>

                {isLoading ?
                    <Grid container alignItems="center" justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                    </Grid> : null
                }
                {isLoading ? null :
                    <Grid item xs={12} >
                        <Grid container justify="center" className={classes.root}>

                            <Grid container item xs={12} className={classes.addressCardsRoot}>
                                {addresses.map((obj, index) =>
                                    <AddressCard
                                        id={obj.id}
                                        key={obj.id}
                                        name={obj.first_name + ' ' + obj.last_name}
                                        address={'Egypt, ' + (obj.location.city_name !== undefined ? obj.location.city_name : obj.location.area_name) + ', ' + obj.address}
                                        phone={obj.phone}
                                        selected={this.state.selectedAddress === index ? true : false}
                                        onClick={this.addressClickHandler.bind(this, index)}
                                        handleDelete={this.handleDelete}
                                    />
                                )}
                                <ButtonCard onClick={this.addAddressDialogToggle} text={"+ " + globalVariables.CHECKOUT_ADD_NEW_ADDRESS[globalVariables.LANG]} />
                            </Grid>

                            <CheckoutForm
                                open={this.state.addForm}
                                title={globalVariables.CHECKOUT_ADD_NEW_ADDRESS[globalVariables.LANG]}
                                onClose={this.addAddressDialogToggle.bind(this)}
                                formAction={this.formActionHandler.bind(this)}
                            />


                            <Button color='primary' variant='contained' style={{ margin: '10px' }} onClick={() => this.handleNextButton(this.props.handleNextButton)}>
                                {globalVariables.LABEL_NEXT[globalVariables.LANG]}
                            </Button>
                            <Button color='secondary' disabled variant='contained' style={{ margin: '10px' }}>
                                {globalVariables.LABEL_PREVIOUS[globalVariables.LANG]}
                            </Button>

                        </Grid>

                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CheckoutAddress);