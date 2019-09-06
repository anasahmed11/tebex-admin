import React from 'react';
import { ClipLoader } from 'react-spinners';
import Cookies from 'universal-cookie';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';
import { withRouter } from 'react-router-dom';

import { withStyles, Grid, Typography, Button, TextField, MenuItem } from '@material-ui/core';
import 'typeface-roboto';

import ExapndPanel from './ExapndPanel';

import styles from '../../../assets/jss/components/wrappers/Profile';
import { userAPI } from '../../../api/api';
import { connect } from 'react-redux';

const LANGUAGES = ['English', 'العربية']

const REGIONS = [
    'الإسكندرية', 'الإسماعيلية', 'الأقصر', 'البحر الاحمر',
    'البحيرة', 'الجيزة', 'الدقهلية', 'السويس', 'الشرقية', 'الغربية', 'الفيوم', 'القاهرة', 'القليوبية', 'المنوفية', 'المنيا'
    , 'الوادي الجديد', 'أسوان', 'أسيوط', 'بني سويف', 'بورسعيد', 'جنوب سيناء', 'دمياط', 'سوهاج', 'شمال سيناء', 'قنا', 'كفر الشيخ', 'مطروح']


const cookies = new Cookies();
const currLanguage = cookies.get(globalVariables.LANGUGAE) === "en" ? "English" : "العربية";


class MainSettingsFrom extends React.Component {
    state = {
        firstname: this.props.user.first_name,
        firstnameErr: '',

        lastname: this.props.user.last_name,
        lastnameErr: '',

        isLoading: true,

        language: currLanguage
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };


    handleMainSettings = () => {
        const data = {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
        }
        if (this.state.language === "English") cookies.set(globalVariables.LANGUGAE, 'en');
        else cookies.set(globalVariables.LANGUGAE, 'ar');

        let valid = true;

        if (this.state.firstname === "") { this.setState({ firstnameErr: 'Cann\'t be empty' }); valid = false; }
        if (this.state.lastname === "") { this.setState({ lastnameErr: 'Cann\'t be empty' }); valid = false; }
        if (valid)
            userAPI.post('settings/main', data)
            .then(res=>{
                
            })
            .catch(res=>{

            })
    }
    render() {
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                <Grid container item justify="center" xs={12} spacing={2} className={classes.padding}>

                    <Grid item sm={4} xs={11} className={classes.padding}>
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            label={globalVariables.FORM_REGISTER_LABEL_FIRST_NAME[globalVariables.LANG]}
                            helperText={this.state.firstnameErr}
                            value={this.state.firstname}
                            onChange={this.handleChange('firstname')}
                            fullWidth
                            error={this.state.firstnameErr !== ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item sm={4} xs={11} className={classes.padding}>
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            label={globalVariables.FORM_REGISTER_LABEL_LAST_NAME[globalVariables.LANG]}
                            type="text"

                            helperText={this.state.lastnameErr}
                            value={this.state.lastname}
                            onChange={this.handleChange('lastname')}
                            fullWidth
                            error={this.state.lastnameErr !== ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>

                    <Grid item sm={3} xs={5} className={classes.padding}>
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            select
                            label={globalVariables.LABEL_LANGUAGE[globalVariables.LANG]}
                            type="text"
                            /*error={this.state.emailError?true:false}
                            helperText={this.state.emailError}*/
                            value={this.state.language}
                            onChange={this.handleChange('language')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        >
                            {LANGUAGES.map(option => (
                                <MenuItem key={uuid()} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" alignItems="center" className={classes.padding}>
                    <Button color='primary' variant='contained' onClick={this.handleMainSettings} >
                        {globalVariables.LABEL_SAVE_CHANGES[globalVariables.LANG]}
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}
const MainSettings = withRouter( connect(mapStateToProps)(withStyles(styles)(MainSettingsFrom)));

class AddressSettingsForm extends React.Component {
    state = {
        mobile: '',
        street: '',
        appartment: '',
        region: 'الإسكندرية',
        expanded: 1,
        isLoading: true,
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSave = () => {
        // const data = {
        //     mobile: this.state.mobile,
        // }
    }

    render() {
        const { classes, } = this.props;
        // const { isLoading } = this.state;
        return (
            <React.Fragment>
                <Grid container item justify="center" xs={12} spacing={2} className={classes.padding}>

                    <Grid item xs={10}>
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            select
                            label="المدينة"
                            type="text"
                            /*error={this.state.emailError?true:false}
                            helperText={this.state.emailError}*/
                            value={this.state.region}
                            onChange={this.handleChange('region')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        >
                            {REGIONS.map(option => (
                                <MenuItem key={uuid()} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            label="رقم الشقة, رقم العمارة, اسم العمارة"
                            type="text"
                            /*error={this.state.emailError?true:false}
                            helperText={this.state.emailError}*/
                            value={this.state.appartment}
                            onChange={this.handleChange('appartment')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            label="اسم الشارع"
                            type="text"
                            /*error={this.state.emailError?true:false}
                            helperText={this.state.emailError}*/
                            value={this.state.street}
                            onChange={this.handleChange('street')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField

                            id={uuid()}
                            label="رقم الهاتف"
                            type="text"
                            /*error={this.state.emailError?true:false}
                            helperText={this.state.emailError}*/
                            value={this.state.mobile}
                            onChange={this.handleChange('mobile')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />

                    </Grid>

                </Grid>
                <Grid container justify="flex-end" alignItems="center" className={classes.padding}>
                    <Button color='primary' variant='contained' onClick={this.handleAddressSettings}>
                        {globalVariables.LABEL_SAVE_CHANGES[globalVariables.LANG]}
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
}
const AddressSettings = withStyles(styles)(AddressSettingsForm);

class SecuritySettingsForm extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: true,
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        //const { isLoading } = this.state;
        return (
            <React.Fragment>
                <Grid container item justify="center" xs={12} spacing={2} className={classes.padding}>

                    <Grid item xs={10} >
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            label={globalVariables.FORM_LOGIN_LABEL_EMAIL[globalVariables.LANG]}
                            type="email"
                            autoComplete="email"
                            error={this.state.emailError ? true : false}
                            helperText={this.state.emailError}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            required
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={10} >
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            value={this.state.password}
                            required
                            label={globalVariables.FORM_REGISTER_LABEL_PASSWORD[globalVariables.LANG]}
                            type="password"
                            autoComplete="current-password"
                            error={this.state.passError ? true : false}
                            helperText={this.state.passError}
                            onChange={this.handleChange('password')}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container justify="flex-end" alignItems="center" className={classes.padding}>
                    <Button color='primary' variant='contained'  >
                        {globalVariables.LABEL_SAVE_CHANGES[globalVariables.LANG]}
                    </Button>
                </Grid>

            </React.Fragment>
        );
    }
}
const SecuritySettings = withStyles(styles)(SecuritySettingsForm);

class Profile extends React.Component {
    state = {
        expanded: 1,
        isLoading: true,
    }

    componentDidMount = () => this.setState({ isLoading: false });

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handlePanelChange = panel => event => {
        this.setState({
            expanded: panel,
        });
    };

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        const components = [
            {
                title: globalVariables.PROFILE_MAIN_SETTINGS[globalVariables.LANG],
                component: <MainSettings />
            },
            {
                title: 'العنوان',
                component: <AddressSettings />
            },
            {
                title: globalVariables.PROFILE_SECURITY_SETTINGS[globalVariables.LANG],
                component: <SecuritySettings />
            },
        ];

        return (
            <Grid container item alignItems='center' justify="center" xs={11}>

                <Grid item xs={12}>
                    <Typography gutterBottom variant='h4' className={classes.textHead}>{globalVariables.SETTINGS_SECTION_PROFILE[globalVariables.LANG]}</Typography>
                </Grid>

                {isLoading ?
                    <Grid container alignItems="center" justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                    </Grid> :
                    <Grid item xs={12}>
                        <ExapndPanel components={components} />
                    </Grid>
                }
            </Grid>
        );
    }
}

export default withStyles(styles)(Profile);