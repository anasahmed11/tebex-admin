import React from 'react';
import uuid from 'uuid';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, TextField, MenuItem, Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { returnAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/parts/ReturnForm';

class ReturnForm extends React.Component {

    state = {
        reason: 0,
        reasons: [{en: '', ar: '', value: 0}],
        note: '',
    }

    componentDidMount() {
        returnAPI.get('reasons')
        .then(res => {
            let reasons = res.data.map((item, index) => ({
                en: item.name_en,
                ar: item.name_ar,
                value: index,
            }));

            this.setState({
                reasons: reasons,
            })
        })
        .catch(err => console.log(err));
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    applyReturnRequest = handler => {
        handler();
    }

    render() {
        const { classes, } = this.props
        return (

            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent className={classes.formContainer}>
                    
                    <Grid container item xs={3}>
                        <Typography className={classes.productTitle}>
                            {`${globalVariables.LANG == 'ar'? this.props.name : this.props.name_en} (${this.props.quantity})`}
                        </Typography>
                        <img src={`${this.props.image}`} className={classes.productImage} alt="ProductImage" />
                    </Grid>

                    <Grid container item justify="center" className={classes.root} xs={8} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.margin}
                                id="outlined-reason-input"
                                select
                                label={globalVariables.FORM_RETURN_LABEL_REASON[globalVariables.LANG]}
                                type="text"
                                value={this.state.reason}
                                onChange={this.handleChange('reason')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            >
                                {this.state.reasons.map(option => (
                                    <MenuItem key={uuid()} value={option.en}>
                                        {option[globalVariables.LANG]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.margin}
                                id="outlined-note-input"
                                label={globalVariables.FORM_RETURN_LABEL_NOTE[globalVariables.LANG]}
                                type="text"
                                value={this.state.note}
                                onChange={this.handleChange('note')}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                                rows="4"
                                required
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.onClose} variant="outlined" color="secondary">
                        {globalVariables.FORM_ADDRESS_LABEL_BACK[globalVariables.LANG]}
                    </Button>
                    <Button
                        onClick={() => this.props.formAction(this.state.reason, this.state.note)}
                        color="primary"
                        variant="outlined"
                        disabled={this.state.note.length < 20}
                    >
                        {globalVariables.FORM_ADDRESS_LABEL_OK[globalVariables.LANG]}
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}

export default withStyles(styles)(ReturnForm);