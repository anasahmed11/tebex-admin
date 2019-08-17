import React from 'react';
import { ClipLoader } from 'react-spinners';

import { withStyles, Grid, Typography, IconButton,  } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'typeface-roboto';

import CustomMaterialTable from '../parts/CustomMaterialTable';

import styles from '../../../assets/jss/components/wrappers/SellingOrders';

const data = [
    { id: 1, name: 'Abdo Hamdy', earning: <IconButton><FontAwesomeIcon icon="edit" /></IconButton> },
    { id: 2, name: 'Abdo Tarek ', earning: 100 },
    { id: 3, name: 'Ahmed Bally', earning: 100 },
    { id: 4, name: 'Ahmed Mekkey', earning: 50 },
    { id: 5, name: 'Mahmoud', parentId:1, earning: 12 },
    { id: 6, name: 'Zakaria', parentId:2, earning: 5 },
];

const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Action', field: 'action' },
];


class SellingOrders extends React.Component{
    state = {
        isLoading: true,
    }

    handleConfirmAction = () => {
    }

    componentDidMount = () => {
        data.map(item => item.action = <IconButton onClick={()=>this.handleConfirmAction(item.id)}>
                <FontAwesomeIcon icon="check" />
            </IconButton>);
    
        this.setState({isLoading:false});
    }

    render(){
        const { classes } = this.props;
        const { isLoading } = this.props;
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