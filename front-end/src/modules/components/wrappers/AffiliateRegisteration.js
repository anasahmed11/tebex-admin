import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { withStyles, Grid, Button, Hidden, Divider, Snackbar, Paper, } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';

import MySnackbar from '../parts/MySnackbar';


import { styles } from '../../../assets/jss/wrappers/AffiliateReg';
import globalVariables from '../../../global-variables';
import PackageCard from '../parts/PackageCard';
import AffiliateForm from '../parts/AffiliateForm';

class AffiliateRegisteration extends React.Component {
    state = {
        isLoading:false
    }
    handleFormSubmition = () => {
        this.setState({isLoading:true})
        /*
        axios
        
        .then(res=>{
            this.props.handleNextStep()
        })
        */
    }
    
    render(){
        const {classes} = this.props;
        const {isLoading} = this.state;
        return(
            <React.Fragment>
                {isLoading?
                    <Grid container alignItems="center" justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                    </Grid> :
                    <React.Fragment>
                        
                        <Grid container justify='center' className={classes.root} spacing={8}>

                            <Grid item lg={3} xs={7}>
                                <PackageCard color="darkgray" title='2' price="1000" features={globalVariables.Package2_AFFILIATE[globalVariables.LANG]} />
                               
                            </Grid>
                           
                            <Grid item lg={4} xs={8}>
                                <PackageCard color="gold" title='1' big={true} price="3000" features={globalVariables.Package1_AFFILIATE[globalVariables.LANG]} />
                               
                            </Grid>
                            
                            <Grid item lg={3} xs={7}>
                                <PackageCard color="#cd7f32" title='3' price={globalVariables.LABEL_FREE[globalVariables.LANG]} features={globalVariables.Package3_AFFILIATE[globalVariables.LANG]} />
                               
                            </Grid>

                        </Grid>


                       <AffiliateForm handleFormSubmition={this.handleFormSubmition} />
                        
                    

                    </React.Fragment>
                }
            </React.Fragment>

        );
    }



}


export default withStyles(styles)(AffiliateRegisteration);