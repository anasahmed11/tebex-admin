import React from 'react';
import { Grid } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';

import {orderAPI} from '../../api/api';

import Order from '../components/parts/Order'

class TrackOrder extends React.Component {

    state = {
        order:{},
        isLoading:true,
    }

    componentDidMount(){
        orderAPI.get(`${this.props.match.params.id}/${this.props.match.params.token}`)
        .then(res=>{
            this.setState({order:res.data, isLoading:false})
        }).catch(res=>{
            this.props.history.push('/')
        })
    }

  render() {
    const { isLoading } = this.state
    console.log(this.state.order)
    return (
        <Grid container justify="center" style={{minHeight:'600px'}}>
            {isLoading?
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