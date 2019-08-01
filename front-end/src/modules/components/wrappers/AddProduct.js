import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';
import ExapndPanel from './ExapndPanel';
import useForm from "react-hook-form"

import MainProductInfoForm from '../parts/MainProductInfoFrom';
import GeneralDescrptionForm from '../parts/GeneralDescrptionForm';

const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing.unit * 4}px 0px`,
    },
    textHead:{
        fontWeight:'500',
        marginBottom: theme.spacing.unit * 4,
    },
});
class Comp1 extends React.Component{
    state ={
        x:0
    }
    handleClick = () => {
        this.setState({x:this.state.x+1})
    }
    render(){
        return(
            <div>
                
                <button onClick={this.handleClick}>{this.state.x}</button>
            </div>
        )
    }


}



function AddProduct(props){
    const { register, handleSubmit } = useForm({
        defaultValues: {
          
        }
      });
    const {classes, } = props;
    

    const onSubmit = data => {
        console.log("SUBMITTED",data)
    };

    const component = [
        {
            title:'Main Information',
            component: <MainProductInfoForm register={register} />
        },
        {
            title:'General Description',
            component: <GeneralDescrptionForm register={register} />
        }
    ];
    
    
    return(
        <Grid container item justify='center' xs={11}>
            <Grid item xs={12}>
                <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>اضافة منتج</Typography>
            </Grid>
            <Grid container justify="center" item xs={12}>
                <Grid item xs={12}>
                    <ExapndPanel components={component} />
                </Grid>
                <Grid item xs={12}>
                    <button onClick={handleSubmit(onSubmit)}>click me please</button>
                </Grid>
            </Grid>
        </Grid>
    );

}


export default withStyles(styles)(AddProduct);