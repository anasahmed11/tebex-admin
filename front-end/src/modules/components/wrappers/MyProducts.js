import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, IconButton,  } from '@material-ui/core';
import CustomMaterialTabl from '../parts/CustomMaterialTable';
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
    { name: 'Abdo Hamdy', id: 1 , earning: <IconButton><FontAwesomeIcon icon="edit" /></IconButton> },
    { name: 'Abdo Tarek ', id: 2 , earning: 100 },
    { name: 'Ahmed Bally', id: 3 , earning: 100 },
    { name: 'Ahmed Mekkey', id: 4 , earning: 50 },
    { name: 'Mahmoud', id: 5, parentId:1 , earning: 12 },
    { name: 'Zakaria', id: 6, parentId:2 , earning: 5 },
  ]
const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Earning', field: 'earning' },

  ]
class MyProdcuts extends React.Component{
    state ={
        isLoading: true,
    }

    componentDidMount(){
        this.setState({isLoading:false})
    }

    handleEdit = (newData, oldData) => {
        console.log(oldData)
    }
    render(){
        const {classes, } = this.props;
        const {isLoading } = this.state;
        return(
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>منتجاتي</Typography>
                </Grid>
                <Grid container item xs={12}>
                    {isLoading?
                        <Grid container alignItems="center" justify="center" >
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={isLoading}
                            />
                        </Grid>: 
                        <CustomMaterialTabl title={'الاوردرات المعلفة'} onRowUpdatePromise={this.handleEdit} data={data} columns={columns} />
                    }
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(MyProdcuts);