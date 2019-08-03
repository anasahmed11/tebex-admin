import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography,  } from '@material-ui/core';
import CustomMaterialTable from '../parts/CustomMaterialTable';
import { ClipLoader } from 'react-spinners';


const styles = theme => ({
    root: {
      backgroundColor: 'white ',
      padding: `${theme.spacing(4)}px 0px`,
    },
    textHead:{
        fontWeight:'500',
        marginBottom: theme.spacing(4),
    },
});

class SellingOrders extends React.Component{
    state ={
    }

    render(){
        const {classes, } = this.props;
        const {isLoading, } = this.props;
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>اوردرات معلقة</Typography>
                </Grid>
                <Grid container spacing={2} item xs={12}>
                {isLoading?
                        <Grid container alignItems="center" justify="center" >
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={isLoading}
                            />
                        </Grid>: <React.Fragment>
                            <CustomMaterialTable title={'الاوردرات المعلقة'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                            <CustomMaterialTable title={'الاودرات المكتملة'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                        </React.Fragment>
                }
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(SellingOrders);