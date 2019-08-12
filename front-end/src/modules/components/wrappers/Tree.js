import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, } from '@material-ui/core';

import CustomMaterialTable from '../parts/CustomMaterialTable';
import { userAPI } from '../../../api/api';
import cancelablePromise from '../../../Providers/CancelablePromise';
import ProfileAvatar from '../parts/ProfileAvatar';


const styles = theme => ({
    root: {
        backgroundColor: 'white ',
        padding: `${theme.spacing(4)}px 0px`,
    },
    textHead: {
        fontWeight: '500',
        marginBottom: theme.spacing(4),
    },
});

// const data = [
//     { name: 'Abdo Hamdy', id: 1 , earning: 25 },
//     { name: 'Abdo Tarek ', id: 2 , earning: 100 },
//     { name: 'Ahmed Bally', id: 3 , earning: 100 },
//     { name: 'Ahmed Mekkey', id: 4 , earning: 50 },
//     { name: 'Mahmoud', id: 5, parentId:1 , earning: 12 },
//     { name: 'Zakaria', id: 6, parentId:2 , earning: 5 },
//   ]
const columns = [
    { title: 'Avatar', field: 'image', render: rowData => <ProfileAvatar gender={rowData.gender} img={rowData.image} name={rowData.name} /> },
    { title: 'Name', field: 'name' },
    { title: 'Earning', field: 'active_points' },

]
class UserDashBoard extends React.Component {
    state = {
        isLoading: true,
        team: [],
    }

    pendingPromises = [];
    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    componentDidMount() {
        const wrappedPromise = cancelablePromise(userAPI.get('/team'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                res.data.map(user => {
                    user.name = user.first_name + ' ' + user.last_name;
                    user.parentId = user.parent_id;
                });
                this.setState({ team: res.data, isLoading: false })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
    }

    render() {
        const { classes, } = this.props;

        return (
            <Grid container item justify='center' xs={11}>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>فريقي</Typography>
                </Grid>
                <Grid container item xs={12}>
                    <CustomMaterialTable title="My Team" data={this.state.team} columns={columns} tree={true} />
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(UserDashBoard);