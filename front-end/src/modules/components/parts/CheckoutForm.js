import React from 'react';
import { Typography, withStyles, Grid, Divider, TextField, MenuItem, Button } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import uuid from 'uuid';
import { locationAPI as axios } from '../../../api/api';

import globalVariables from '../../../global-variables';
const styles = theme => ({
    root: {
        margin:'auto'
    },
    paddingTop:{
        padding:'20px 0px'
    }, 
  
   
});


class CheckoutForm extends React.Component{
    state={
        
        first_name:'',
        last_name:'',
        address:'',
        street:'',
        landmark:'',
        phone:'',
        email:'',
        notes:'',
        COUNTRIES:[],
        country:'',
        CITIES:[],
        city:'',
        AREAS:[],
        area:'',
    }

    componentDidMount(){
        axios.get('countries/')
        .then(res=>{
            this.setState({COUNTRIES:res.data,country:'',CITIES:[],city:'',AREAS:[],area:''})  
        })
        .catch(res=>{
            console.log(res)
        })
        
    }


    handleCreateAddress(callbackFn){
        let data = {...this.state}
        delete data.CITIES
        delete data.AREAS
        delete data.COUNTRIES
        if (data.area==='') delete data.area
        
        axios.post('create/', data)
        .then(res=>{
            callbackFn(res.data)
        })
        .catch(res=>{
            console.log(res)
        })
    }

    verifyData = () => {
        return( this.state.first_name &&
            this.state.last_name &&
            this.state.address &&
            this.state.street &&
            this.state.phone &&
            this.state.email &&
            this.state.notes
        )
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleCountryChange = prop => event =>{
        this.setState({ [prop]: event.target.value });
        axios.get('cities/' + event.target.value)
        .then(res=>{
            this.setState({CITIES:res.data,city:'',AREAS:[],area:'0'})  
        })
        .catch(res=>{
            console.log(res)
        })
    }

    handleCityChange = prop => event =>{
        this.setState({ [prop]: event.target.value });
        axios.get('areas/' + event.target.value)
        .then(res=>{
            this.setState({AREAS:res.data,area:''})  
        })
        .catch(res=>{
            console.log(res)
        })
    }
    render(){
        const { classes,  } = this.props
        return(
            
        <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          {this.props.desc? 
            <DialogContentText style={{marginBottom: 4,}}>
              {this.props.desc}
            </DialogContentText> : null
          }
          <Grid container justify="center" className={classes.root} xs={11} spacing={16}>
             
             <Grid item sm={6} xs={12}>
                 <TextField
                     className={classes.margin}
                     id="outlined-first_name-input"
                     label={globalVariables.FORM_ADDRESS_LABEL_FIRST_NAME[globalVariables.LANG]}
                     type="text"
                     /*error={this.state.emailError?true:false}
                     helperText={this.state.emailError}*/
                     value={this.state.first_name}
                     onChange={this.handleChange('first_name')}
                     fullWidth
                     InputLabelProps={{
                         shrink: true,
                     }}
                     required
                 />
             </Grid>
             <Grid item sm={6} xs={12}>
                 <TextField
                     className={classes.margin}
                     id="outlined-last_name-input"
                     label={globalVariables.FORM_ADDRESS_LABEL_LAST_NAME[globalVariables.LANG]}
                     type="text"
                     /*error={this.state.emailError?true:false}
                     helperText={this.state.emailError}*/
                     value={this.state.last_name}
                     onChange={this.handleChange('last_name')}
                     fullWidth
                     InputLabelProps={{
                         shrink: true,
                     }}
                     required
                 />
             </Grid>
         
             
             <Grid item  xs={12}>
                 <TextField
                     className={classes.margin}
                     id="outlined-email-input"
                     select
                     label={globalVariables.FORM_ADDRESS_LABEL_COUNTRY[globalVariables.LANG]}
                     type="text"
                     
                     value={this.state.country}
                     onChange={this.handleCountryChange('country')}
                     fullWidth
                     InputLabelProps={{
                         shrink: true,
                     }}
                     required
                 >
                     {this.state.COUNTRIES.map(option => (
                         <MenuItem key={uuid()} value={option.id}>
                             {option.country_name}
                         </MenuItem>
                     ))}
                 </TextField>
             </Grid>

             {this.state.CITIES.length?
                 <Grid item  xs={12}>
                     <TextField
                         className={classes.margin}
                         id="outlined-email-input"
                         select
                         label={globalVariables.FORM_ADDRESS_LABEL_CITY[globalVariables.LANG]}
                         type="text"
                         /*error={this.state.emailError?true:false}
                         helperText={this.state.emailError}*/
                         value={this.state.city}
                         onChange={this.handleCityChange('city')}
                         fullWidth
                         InputLabelProps={{
                             shrink: true,
                         }}
                         required
                     >
                         {this.state.CITIES.map(option => (
                             <MenuItem key={uuid()} value={option.id}>
                                 {option.city_name}
                             </MenuItem>
                         ))}
                     </TextField>
                 </Grid>:''
             }
             
             {this.state.AREAS.length?
                 <Grid item  xs={12}>
                     <TextField
                         className={classes.margin}
                         id="outlined-email-input"
                         select
                         label={globalVariables.FORM_ADDRESS_LABEL_AREA[globalVariables.LANG]}
                         type="text"
                         value={this.state.area}
                         onChange={this.handleChange('area')}
                         fullWidth
                         InputLabelProps={{
                             shrink: true,
                         }}
                         required
                     >
                         {this.state.AREAS.map(option => (
                             <MenuItem key={uuid()} value={option.id}>
                                 {option.area_name}
                             </MenuItem>
                         ))}
                     </TextField>
                 </Grid>:''
             }
             
 

     
             <Grid item xs={12}>
                 <TextField
                     className={classes.margin}
                     id="outlined-appartment-input"
                     label={globalVariables.FORM_ADDRESS_LABEL_ADDRESS[globalVariables.LANG]}
                     type="text"
                     
                     value={this.state.address}
                     onChange={this.handleChange('address')}
                     fullWidth
                     InputLabelProps={{
                         shrink: true,
                     }}
                     required
                 />
             </Grid>
             
             <Grid item xs={6}>
                 <TextField
                     className={classes.margin}
                     id="outlined-appartment-input"
                     label={globalVariables.FORM_ADDRESS_LABEL_LAND_MARK[globalVariables.LANG]}
                     type="text"
                     /*error={this.state.emailError?true:false}
                     helperText={this.state.emailError}*/
                     value={this.state.landmark}
                     onChange={this.handleChange('landmark')}
                     fullWidth
                     InputLabelProps={{
                         shrink: true,
                     }}
                     
                 />
             </Grid>
     
             <Grid item xs={6}>
                 <TextField
                     className={classes.margin}
                     id="outlined-appartment-input"
                     label={globalVariables.FORM_ADDRESS_LABEL_PHONE[globalVariables.LANG]}
                     type="text"
                     /*error={this.state.emailError?true:false}
                     helperText={this.state.emailError}*/
                     value={this.state.phone}
                     onChange={this.handleChange('phone')}
                     fullWidth
                     InputLabelProps={{
                         shrink: true,
                     }}
                     required
                 />
             </Grid>
             <Grid item xs={12}>
                 <TextField
                     className={classes.margin}
                     id="outlined-email-input"
                     label={globalVariables.FORM_ADDRESS_LABEL_EMAIL[globalVariables.LANG]}
                     type="email"
                     /*error={this.state.emailError?true:false}
                     helperText={this.state.emailError}*/
                     value={this.state.email}
                     onChange={this.handleChange('email')}
                     fullWidth
                     InputLabelProps={{
                         shrink: true,
                     }}
                     required
                 />
             </Grid>
             
             <Grid item xs>
                 <TextField
                     className={classes.margin}
                     id="outlined-notes-input"
                     label={globalVariables.FORM_ADDRESS_LABEL_NOTE[globalVariables.LANG]}
                     type="text"
                     /*error={this.state.emailError?true:false}
                     helperText={this.state.emailError}*/
                     value={this.state.notes}
                     onChange={this.handleChange('notes')}
                     fullWidth
                     InputLabelProps={{
                         shrink: true,
                     }}
                     multiline
                     rows="4" 
                 />
             </Grid>
         

             
         
             
         </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
          {globalVariables.FORM_ADDRESS_LABEL_BACK[globalVariables.LANG]}
          </Button>
          <Button
            onClick={() => this.handleCreateAddress(this.props.formAction)}
            color="primary"
            >
            {globalVariables.FORM_ADDRESS_LABEL_OK[globalVariables.LANG]}
          </Button>
        </DialogActions>
      </Dialog>
 
        );
    }
}


export default withStyles(styles)(CheckoutForm)