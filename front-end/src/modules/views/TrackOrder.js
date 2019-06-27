import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ClipLoader } from 'react-spinners';

import {orderAPI} from '../../api/api';

import Order from '../components/parts/Order'

const styles = theme => ({
 
})


class TrackOrder extends React.Component {

    state = {
        order:{},
        isLoading:true,
        
    }

    componentDidMount(){
        orderAPI.get(`${this.props.match.params.id}`)
        .then(res=>{
            this.setState({order:res.data[0], isLoading:false})
        }).catch(res=>{
            console.log(res.data)
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
                </Grid>:null
            }
            {isLoading?null:<Order order={this.state.order} />}
            
        </Grid>
    );
  }
}

export default withStyles(styles)(TrackOrder);