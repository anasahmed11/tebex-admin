import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ClipLoader } from 'react-spinners';

//import {affiliateAPI} from '../../../api/api'

import globalVariables from '../../../global-variables';

import AffiliateRegisteration from './AffiliateRegisteration';
import { initUser } from '../../../store/actions/user';

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

const STATES = ['Not Applied','Pending','Approved','Refused']

class Affiliate extends React.Component{
    state ={
        isLoading:false,
    }
    handleNextStep = () => {
        this.props.handleInitUser()
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
        const page = STATES.findIndex(state=>state===this.props.program.affiliate)
        
        

        switch(page){
            case 0:
                return <AffiliateRegisteration handleNextStep={this.handleNextStep} />
            case 1:
                return <Page1 />
            case 2:
                return <Page2 />
            case 3:
                return <React.Fragment>
                            <Grid item xs={12}>
                                <Typography gutterBottom component='h1' variant='h5' >{globalVariables.AFFILIATE_REFUSED[globalVariables.LANG]}</Typography>
                            </Grid>
                            <AffiliateRegisteration handleNextStep={this.handleNextStep} />
                        </React.Fragment>
            default:
                return <React.Fragment>
                    </React.Fragment>
        }
    }
    render(){
        const {classes } = this.props;
        const { isLoading } = this.state
        
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.SETTINGS_SECTION_AFFILIATE[globalVariables.LANG]}</Typography>
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
                <Grid container item justify='center' alignItems='center' xs={12} className={classes.root}>
                    
                    {this.getPage()}
                </Grid>
                }
                

            </Grid>
        );
    }
}



const mapStateToProps = state => {
    return {
        program: state.user.program,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        handleInitUser: () => dispatch(initUser()),
    }
  }
  


export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Affiliate)));