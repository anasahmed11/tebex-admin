import React from 'react';

import { withStyles, Grid, Typography, LinearProgress, Snackbar } from '@material-ui/core';

import { verifyAPI, resendAPI } from '../../api/api';

import MySnackbar from '../components/parts/MySnackbar'
import { Helmet } from "react-helmet";

import styles from '../../assets/jss/views/Verify';
import globalVariables from '../../global-variables';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class Verify extends React.Component {

    state = {
        isLoading: true,
        message: "",
        isPopup: false,
        messageType: "",
        serverMessage: "",
    }

    componentDidMount() {
        if(!cookies.get(globalVariables.ACCESS_TOKEN)) this.props.history.push('/auth');
        
        verifyAPI.get(`${this.props.match.params.id}${this.props.location.search}`)
            .then(res => {
                this.setState({
                    isLoading: false,
                    message: "شكرا على ثقتكم بنا, يمكنك الان التصفح وشراء منتجاتنا. تحويل ...",
                    messageType: "success",
                    isPopup: true,
                    serverMessage: "Email Verified Successfully",
                })
                setTimeout(() => { this.props.history.push('/'); }, 1000);
            })
            .catch(err => {
                resendAPI.get('')
                this.setState({
                    isLoading: false,
                    message: "تم ارسال كود تفعيل جديد للحساب, يرجى تفعيل الحساب في غضون 24 ساعة",
                    messageType: "error",
                    isPopup: true,
                    serverMessage: "Email Verification Failed"
                })
            })
    }

    handlePopupClose = () => {
        this.setState({ isPopup: false })
    }

    render() {

        const { classes } = this.props
        const [text, progressPar] = this.state.isLoading ? ["تحميل ...", <LinearProgress />] : [this.state.message, ""]
        const snack = <Snackbar
            style={{ direction: 'ltr', bottom: '50px' }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={this.state.isPopup}
            autoHideDuration={6000}
            onClose={this.handlePopupClose}
        >
            <MySnackbar
                className={classes.margin}
                onClose={this.handlePopupClose}
                variant={this.state.messageType}
                message={this.state.serverMessage}
            />

        </Snackbar>

        return (
            <Grid container justify='center' className={classes.root}>
                <Helmet>
                    <title>{globalVariables.PAGE_TITLE_VERIFY[globalVariables.LANG]}</title>

                </Helmet>
                {snack}
                <Grid item md={8} xs={10}>
                    {progressPar}
                    <Grid container justify='flex-start' className={classes.item}>
                        <Grid item md={12} sm={12}>
                            <Typography component="h2" variant="h4" gutterBottom>تفعيل الحساب</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify='flex-start' className={classes.item} style={{ minHeight: '200px' }}>
                        <Grid item md={12} sm={12}>
                            <Typography component="h2" variant="h6" gutterBottom>{text}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}




export default withStyles(styles)(Verify);