import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, Button, TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, MenuItem } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon} from '@material-ui/icons';
import uuid from 'uuid';
import RTL from './RTL';

const styles = theme => ({
    root: {
        backgroundColor: 'white ',
        // padding: `${theme.spacing.unit * 4}px 0px`,
      },
    expanDetails:{
        display:'inherit'
    },
    padding:{
        padding: `${theme.spacing.unit * 2}px 0px`,
    }
    
});

const LANGUAGES = ['English','العربية']

const REGIONS = [
    'الإسكندرية','الإسماعيلية','الأقصر','البحر الاحمر',
'البحيرة','الجيزة','الدقهلية','السويس','الشرقية','الغربية','الفيوم','القاهرة','القليوبية','المنوفية','المنيا'
,'الوادي الجديد','أسوان','أسيوط','بني سويف','بورسعيد','جنوب سيناء','دمياط','سوهاج','شمال سيناء','قنا','كفر الشيخ','مطروح']





class Profile extends React.Component{
    state ={
        firstname:'',
        lastname:'',
        mobile:'',
        birthday:'',
        email:'',
        password:'',
        language:'العربية',
        street:'',
        appartment:'',
        region:'الإسكندرية',
        expanded:1
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handlePanelChange = panel => event => {
        this.setState({
          expanded: panel,
        });
      };
    render(){
        const {classes, } = this.props;
        
       

        return(
            
            <Grid container alignItems='center' justify="center" className={classes.root} xs={11}>
                
                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='display1' className={classes.textHead}>الملف الشخصي</Typography>
                </Grid>


                <Grid item xs={12}>
                    
                    <ExpansionPanel 
                        expanded={this.state.expanded===1}
                        onChange={this.handlePanelChange(1)} 
                        >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>الاعدادات الرئيسية</Typography>
                        </ExpansionPanelSummary>
                        
                        <ExpansionPanelDetails className={classes.expanDetails}>
                            <Grid container justify="center" xs={12} spacing={16} className={classes.padding}>
                    
                                        <Grid item sm={4} xs={11} className={classes.padding}>
                                            <TextField
                                                className={classes.margin}
                                                id="outlined-appartment-input"
                                                label="الاسم الاول"
                                                type="text"
                                                /*error={this.state.emailError?true:false}
                                                helperText={this.state.emailError}*/
                                                value={this.state.number}
                                                onChange={this.handleChange('fitstname')}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                            />
                                        </Grid>
                                        <Grid item sm={4} xs={11} className={classes.padding}>
                                            <TextField
                                                className={classes.margin}
                                                id="outlined-email-input"
                                                label="الاسم الاخير"
                                                type="text"
                                                /*error={this.state.emailError?true:false}
                                                helperText={this.state.emailError}*/
                                                value={this.state.email}
                                                onChange={this.handleChange('lastname')}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                            />
                                        </Grid>
                                    
                                        <Grid item sm={3} xs={5} className={classes.padding}>
                                            <TextField
                                                className={classes.margin}
                                                id="outlined-email-input"
                                                select
                                                label="اللغة"
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
                                <Button color='primary' variant='contained'  >
                                    حفظ التغيرات
                                </Button>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    
                    <ExpansionPanel 
                        expanded={this.state.expanded===2}
                        onChange={this.handlePanelChange(2)} 
                    >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>العنوان</Typography>
                        </ExpansionPanelSummary>
                        
                        <ExpansionPanelDetails className={classes.expanDetails}>
                            <Grid container justify="center" xs={12} spacing={16} className={classes.padding}>
                    

                                <Grid item  xs={10}>
                                    <TextField
                                        className={classes.margin}
                                        id="outlined-email-input"
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
                                        id="outlined-appartment-input"
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
                                <Grid item  xs={10}>
                                    <TextField
                                        className={classes.margin}
                                        id="outlined-street-input"
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
                                <Grid item  xs={10}>
                                    <TextField
                                            
                                        id="outlined-appartment-input"
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
                                <Button color='primary' variant='contained'  >
                                    حفظ التغيرات
                                </Button>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                   
                    


                    <ExpansionPanel
                        expanded={this.state.expanded===3}
                        onChange={this.handlePanelChange(3)} 
                    >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>معلومات الامان</Typography>
                        </ExpansionPanelSummary>
                        
                        <ExpansionPanelDetails className={classes.expanDetails}>
                            <Grid container justify="center" xs={12} spacing={16} className={classes.padding}>
                    
                                <Grid item xs={10} >
                                    <TextField
                                        className={classes.margin}
                                        id="register-email"
                                        label="البريد الالكتروني"
                                        type="email"
                                        autoComplete="email"
                                        error={this.state.emailError?true:false}
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
                                        id="register-password"
                                        value={this.state.password}
                                        required
                                        label="كلمة السر"
                                        type="password"
                                        autoComplete="current-password"
                                        error={this.state.passError?true:false}
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
                                    حفظ التغيرات
                                </Button>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>




                </Grid>     
            </Grid>
               
        );
    }
}


export default withStyles(styles)(Profile);