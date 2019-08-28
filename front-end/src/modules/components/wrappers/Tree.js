import React from 'react';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, } from '@material-ui/core';
import 'typeface-roboto';

import CustomMaterialTable from '../parts/CustomMaterialTable';
import ProfileAvatar from '../parts/ProfileAvatar';

import { userAPI } from '../../../api/api';
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/Tree';

const columns = [
    { title: globalVariables.LABEL_AVATAR[globalVariables.LANG], field: 'image', render: rowData => <ProfileAvatar gender={rowData.gender} img={rowData.image} name={rowData.name} /> },
    { title: globalVariables.LABEL_NAME[globalVariables.LANG], field: 'name' },
    { title: globalVariables.LABEL_REGISTERED_AT[globalVariables.LANG], field: 'created_at', type:'date' },
    { title: globalVariables.LABEL_LEVEL[globalVariables.LANG], field: 'level', type: 'numeric' },
    { title: globalVariables.LABEL_EARNINGS[globalVariables.LANG], field: 'active_points', type:'currency', currencySetting:{} },
];

class Tree extends React.Component {
    state = {
        isLoading: true,
        team: [],
    }

    pendingPromises = [];

    componentWillUnmount = () => this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise => this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise => this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    componentDidMount = () => {
        const wrappedPromise = cancelablePromise(userAPI.get('/team'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                res.data.map(user => {
                    user.name = user.first_name + ' ' + user.last_name;
                    user.parentId = user.parent_id;
                    user.created_at = new Date(user.created_at).toDateString("yyyy-MM-dd");
                    return null;
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
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{globalVariables.DASHBOARD_TEAM_MEMBERS[globalVariables.LANG]}</Typography>
                </Grid>
                <Grid container item xs={12}>
                    <CustomMaterialTable title={globalVariables.DASHBOARD_TEAM_MEMBERS[globalVariables.LANG]} data={this.state.team} columns={columns} tree={true} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Tree);