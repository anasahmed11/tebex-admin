import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, IconButton,  } from '@material-ui/core';
import CustomMaterialTable from '../parts/CustomMaterialTable';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

const data = [
    { id:1 ,name: 'Abdo Hamdy', id: 1 , earning: <IconButton><FontAwesomeIcon icon="edit" /></IconButton> },
    { id:2 ,name: 'Abdo Tarek ', id: 2 , earning: 100 },
    { id:3 ,name: 'Ahmed Bally', id: 3 , earning: 100 },
    { id:4 ,name: 'Ahmed Mekkey', id: 4 , earning: 50 },
    { id:5 ,name: 'Mahmoud', id: 5, parentId:1 , earning: 12 },
    { id:6 ,name: 'Zakaria', id: 6, parentId:2 , earning: 5 },
  ]
const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Action', field: 'action' },

  ]


class SellingOrders extends React.Component{
    state ={
        isLoading: true
    }
    handleConfirmAction = () => {

    }
    componentDidMount(){
        data.map(item=>item.action = <IconButton onClick={()=>this.handleConfirmAction(item.id)}><FontAwesomeIcon icon="check" /></IconButton> )
        this.setState({isLoading:false})
    }
    render(){
        const {classes, } = this.props;
        const {isLoading, } = this.props;
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>اوردرات </Typography>
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
                            <CustomMaterialTable data={data} columns={columns} title={'الاوردرات المعلقة'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                            <CustomMaterialTable title={'الاودرات في الشحن'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                            <CustomMaterialTable title={'الاودرات المكتملة'} /*onRowUpdatePromise={this.handleEdit} data={data} columns={columns}*/ />
                        </React.Fragment>
                }
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(SellingOrders);