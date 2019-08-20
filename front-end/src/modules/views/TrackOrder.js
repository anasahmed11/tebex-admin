import React from 'react';
import { ClipLoader } from 'react-spinners';
import { Grid } from '@material-ui/core';

import { orderAPI } from '../../api/api';
import { Helmet } from "react-helmet";

import Order from '../components/parts/Order'
import globalVariables from '../../global-variables';

class TrackOrder extends React.Component {

    state = {
        order: {},
        isLoading: true,
    }

    componentDidMount = () => {
        orderAPI.get(`${this.props.match.params.id}/${this.props.match.params.token}`)
            .then(res => {
                this.setState({ order: res.data, isLoading: false })
            }).catch(res => {
                this.props.history.push('/')
            })
    }

    render() {
        const { isLoading } = this.state
        console.log(this.state.order)
        return (
            <Grid container justify="center" style={{ minHeight: '600px' }}>
                <Helmet>
                    <title>{globalVariables.PAGE_TITLE_TRACK_ORDER[globalVariables.LANG]}</title>
                    
                </Helmet>
                {isLoading ?
                    <Grid container alignItems="center" justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                    </Grid> : <Order order={this.state.order} />}
            </Grid>
        );
    }
}

export default TrackOrder;