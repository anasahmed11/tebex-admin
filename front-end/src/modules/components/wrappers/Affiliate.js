import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';

import { ClipLoader } from 'react-spinners';

import {affiliateAPI} from '../../../api/api'
import globalVariables from '../../../global-variables';

import AffiliateRegisteration from './AffiliateRegisteration';

const styles = theme => ({
    root: {
        padding:theme.spacing.unit * 2,
        minHeight:'350px'
      },

});
function Page1(props){
    return globalVariables.AFFILIATE_PAGE1[globalVariables.LANG]
}

function Page2(props){
    return globalVariables.AFFILIATE_PAGE2[globalVariables.LANG]
}

class Affiliate extends React.Component{
    state ={
        isLoading:false,
        page:0,
    }
    handleNextStep = () => {
        this.setState({page:this.state.page+1})
    }
    componentDidMount(){
        // affiliateAPI.get('/')
        // .then(res=>{
        //     this.setState({page:res.data,isLoading:false})
        // })
        // .catch(res=>{
        //     this.setState({isLoading:false})
        // })
    }
    getPage = () => {
        switch(this.state.page){
            case 0:
                return <AffiliateRegisteration handleNextStep={this.handleNextStep} />
            case 1:
                return <Page1 />
            case 2:
                return <Page2 />
        }
    }
    render(){
        const {classes } = this.props;
        const { isLoading } = this.state
        
        return(
            <Grid container justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='display1' className={classes.textHead}>{globalVariables.SETTINGS_SECTION_AFFILIATE[globalVariables.LANG]}</Typography>
                </Grid>
                {isLoading?
                <Grid container alignItems="center" justify="center" >
                    <ClipLoader
                        sizeUnit={"px"}
                        size={75}
                        color={'#123abc'}
                        loading={isLoading}
                    />
                </Grid> :
                <Grid container justify='center' alignItems='center' xs={12} className={classes.root}>
                    {this.getPage()}
                </Grid>
                }
                

            </Grid>
        );
    }
}


export default withStyles(styles)(Affiliate);