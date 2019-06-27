import React from 'react';
import { Typography, withStyles, Grid,   } from '@material-ui/core';


const styles = theme => ({
    checkoutSummary:{
        padding: `${theme.spacing.unit * 2}px 0px`,
        border:'1px solid rgba(0,0,0,0.1)',
        minHeight:'200px',
    },
    textHeader:{
        fontWeight:'500'
    },
    textSection:{
        fontWeight:'500',
        fontSize:'13px',
        color:'rgb(120,120,120)',
    },
    textHead:{
        fontWeight:'bold',
        fontSize:'15px',
        color:'rgb(120,120,120)',
    },
    
});


function CheckoutSummary(props){
    const { classes, address } = props
    const addressName =  address.location.city_name!==undefined? address.location.city_name:address.location.area_name
    return(
    <React.Fragment>

        <Grid container justify="center" className={classes.checkoutSummary}>    
            
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography gutterBottom component='h1' variant='h5' className={classes.textHeader}>العنوان</Typography>
                    </Grid>
                    
                </Grid>
            </Grid>

            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography component='h1' variant='h6' className={classes.textHead}>الاسم</Typography>
                    </Grid>
                    <Grid item xs={8}> 
                        <Typography component='h1' variant='h6' className={classes.textSection}>{address.first_name+' '+address.last_name}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography component='h1' variant='h6' className={classes.textHead}>العنوان</Typography>
                    </Grid>
                    <Grid item xs={8}> 
                        <Typography gutterBottom component='h1' variant='h6' className={classes.textSection}>{'Egypt' + ', ' + addressName + ', ' + address.address}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography component='h1' variant='h6' className={classes.textHead}>موبايل</Typography>
                    </Grid>
                    <Grid item xs={8}> 
                        <Typography gutterBottom component='h1' variant='h6' className={classes.textSection}>{address.phone}</Typography>
                    </Grid>
                </Grid>
            </Grid>

           

        </Grid>
        
        
        
    </React.Fragment>
    );
}


export default withStyles(styles)(CheckoutSummary)