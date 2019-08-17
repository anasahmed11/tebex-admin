import React from 'react';
import { connect } from 'react-redux';

import { withStyles, Grid, Typography, LinearProgress, Snackbar   } from '@material-ui/core';

import {verifyAPI as axios, resendAPI} from '../../api/api';

import MySnackbar from '../components/parts/MySnackbar'

import styles from '../../assets/jss/views/Verify';


class Verify extends React.Component{

    state = {
        isLoading: true,
        message: "",
        isPopup: false,
        messageType: "",
        serverMessage: "",
    }

    componentDidMount(){
        console.log(`${this.props.match.params.id}${this.props.location.search}`)
        axios.get(`${this.props.match.params.id}${this.props.location.search}`)
        .then(res => {
            this.setState({
                isLoading: false,
                message: "شكرا على ثقتكم بنا, يمكنك الان التصفح وشراء منتجاتنا. تحويل ...",
                messageType: "success",
                isPopup: true,
                serverMessage: "Email Verified Successfully",
            })
            setTimeout(()=>{this.props.history.push(this.props.redirectPath,{pathname: 'http://localhost:3000'});},3000)
        })
        .catch(err=>{
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
        this.setState({isPopup: false})
    }

    render(){

        const {classes} = this.props
        const [text,progressPar] = this.state.isLoading? ["تحميل ...",<LinearProgress />] : [this.state.message,""]
        const snack =   <Snackbar
                            style={{direction: 'ltr', bottom: '50px'}}   
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
        
        return(
            <Grid container justify='center' className={classes.root}>
                {snack}
                <Grid item md={8} xs={10}>
                    {progressPar}
                    <Grid container justify='flex-start' className={classes.item}>
                        <Grid item  md={12} sm={12}>
                            <Typography component="h2" variant="h4" gutterBottom>تفعيل الحساب</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify='flex-start' className={classes.item} style={{minHeight: '200px'}}>
                        <Grid item  md={12} sm={12}>
                            <Typography component="h2" variant="h6" gutterBottom>{text}</Typography>
                        </Grid>
                    </Grid>   
                </Grid>
             </Grid>
        );
    }

}


const mapStateToProps = state => {
    return {
        redirectPath: state.auth.path
    }
}

export default  connect(mapStateToProps)(withStyles(styles)(Verify));