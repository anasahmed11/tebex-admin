import React from "react";
import uuid from 'uuid';

import { withStyles, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar } from "@material-ui/core";

import { categoryAPI, specAPI } from "../../../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../../assets/jss/components/parts/CategoryForm';
import globalVariables from "../../../global-variables";
import Localization from "../wrappers/Localization";
import MySnackbar from "./MySnackbar";

const getLeaves = (cats) => {
    let leaves = [];
    const f1 = childrenLeave => { leaves.push(childrenLeave); return null; };
    const f2 = function (childrenLeave) {
        childrenLeave.name = childrenLeave.name + ' <- ' + ((globalVariables.LANG === 'ar') ? this.cat.name : this.cat.name_en)
        leaves.push(childrenLeave);
        return null;
    }
    for (let cat of cats) {
        if (cat.children.length)
            if (cat.name === "root")
                getLeaves(cat.children).map(f1)
            else
                getLeaves(cat.children).map(f2, { cat: cat })
        else {
            cat.name = globalVariables.LANG === 'ar' ? cat.name : cat.name_en
            leaves = [...leaves, cat];
        }
    }
    return leaves;
}

class CategoryForm extends React.Component {

    state = {
        isLoading: true,
        
        isPopup: false,
        errors: '',

        specsError: {},
        CATEGORIES: [],
        category: '',
        categoryError: '',
        categorySpecs: []
    }

    handleChange = prop => event => {

        this.setState({ [prop]: event.target.value === -1 ? null : event.target.value });
        if (prop === "category") {
            this.setState({ isLoading: false })
            categoryAPI.get(`${event.target.value}/specs/`)
                .then(res => {

                    for (let spec of res.data.data) 
                        spec.name = globalVariables.LANG === 'ar' ? spec.name : spec.name_en;

                    this.setState({
                        categorySpecs: res.data.data,
                        isLoading: false
                    })
                })
                .catch(res => {

                })
        }
    };

    getData = () => {

        let valid = true;
        let specsError = {};

        if (this.state.category) {
            this.setState({ categoryError: '' })
        }
        else {
            this.setState({ categoryError: 'Can\'t be empty' })
            return false
        }

        let data = { category: this.state.category };
        let idx = 0;

        for (let spec of this.state.categorySpecs) {
            const id = spec.id;
            const name = spec.name;
            
            const value = this.state[name];
            if (value === undefined) {
                specsError = { ...specsError, [name]: name + ' spec can\'t be empty' };
                valid = false;
            }
            else {
                data = { ...data, [`specs[${idx}][id]`]: id, [`specs[${idx}][value]`]: value };
                idx += 1
            }
        }
        this.setState({ specsError: specsError });
        if (valid) return data;
        else return false;

    }
    componentDidMount() {
        this.props.setChildCallback(this.getData)

        categoryAPI.get('')
            .then(res => {
                const leaves = getLeaves(res.data);
                if (this.props.edit) {
                    categoryAPI.get(`${this.props.defaultValues.category_id}/specs/`)
                        .then(res => {
                            for (let spec of res.data.data) 
                                spec.name = globalVariables.LANG === 'ar' ? spec.name : spec.name_en;
                            
                            this.setState({
                                categorySpecs: res.data.data,
                                isLoading: false,
                                CATEGORIES: leaves,
                                category: this.props.defaultValues.category_id,
                                // ...specsData
                            })
                        })
                        .catch(err => {
                        })
                    //this.setState({ isLoading: false, CATEGORIES: leaves, category: this.props.defaultValues.category_id });
                }
                else {
                    this.setState({ isLoading: false, CATEGORIES: leaves });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleAddNewValue = (specName, specId, idx) => {
        let data = {
            'ar': this.state[specName + 'Ar'],
            'en': this.state[specName + 'En'],
        }
        if(data.ar===undefined || data.ar.length===0 || data.en===undefined || data.en.length===0){
            this.setState({errors: "there is required fields", isPopup:true});
            return;
        }

        specAPI.post(`${specId}/`, data)
            .then(res => {
                let categorySpecs = this.state.categorySpecs;

                categorySpecs[idx].values.ar.push(data['ar'])
                categorySpecs[idx].values.en.push(data['en'])

                this.setState({ categorySpecs: categorySpecs, [specName]: false, }, () => {
                    this.setState({ [categorySpecs[idx].name]: categorySpecs[idx].values.ar.length - 1 })
                })
            })
            .catch(err => {
                this.setState({ [specName]: false })
            })

    }
    handleClickOpen = (name) => {
        this.setState({ [name]: true })
    }
    handleClose = (name) => {
        this.setState({ [name]: false })
    }
    handlePopupClose = () => 
        this.setState({isPopup:false})

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                {this.state.isLoading ? null :

                    <TextField
                        className={classes.margin}
                        id={uuid()}
                        select
                        label={globalVariables.LABEL_CATEGORY[globalVariables.LANG]}
                        type="text"
                        error={this.state.categoryError ? true : false}
                        helperText={this.state.categoryError}
                        value={this.state.category}
                        onChange={this.handleChange('category')}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    >
                        {this.state.CATEGORIES.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                }

                {
                    this.state.categorySpecs.map((spec, idx) => <React.Fragment>
                        <TextField
                            className={classes.margin}
                            id={uuid()}
                            select
                            label={spec.name}
                            type="text"
                            error={this.state.specsError[spec.name] ? true : false}
                            helperText={this.state.specsError[spec.name] ? this.state.specsError[spec.name] : ''}
                            value={this.state[spec.name]}
                            onChange={this.handleChange(spec.name)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        >
                            {spec.values[globalVariables.LANG].map((value, idx) => (
                                <MenuItem value={idx}>
                                    {value}
                                </MenuItem>
                            ))}
                            <MenuItem value={-1}>
                                <Button fullWidth variant="contained" color="primary" onClick={() => this.handleClickOpen(spec.name + "Popup")}>
                                    <Localization title="PRODUCT_ADD_NEW_SPEC" /> &ensp; <FontAwesomeIcon icon="plus-square" />
                                </Button >

                            </MenuItem>
                        </TextField>
                        <Dialog
                            open={this.state[spec.name + "Popup"] === true}
                            onClose={() => this.handleClose(spec.name + "Popup")}
                        >
                            <Snackbar
                                style={{bottom:'50px'}}   
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
                                    variant="error"
                                    message={this.state.errors}
                                    
                                />
                            </Snackbar>
                            <DialogTitle >Add new value</DialogTitle>
                            <DialogContent>
                                <TextField
                                    className={classes.margin}
                                    id="spec_add_new_value_ar"
                                    label="value name in ar"
                                    value={this.state[spec.name + "PopupAr"]}
                                    onChange={this.handleChange(spec.name + "PopupAr")}
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    className={classes.margin}
                                    id="spec_add_new_value_en"
                                    label="value name in english"
                                    value={this.state[spec.name + "PopupEn"]}
                                    onChange={this.handleChange(spec.name + "PopupEn")}
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={() => this.handleClose(spec.name + "Popup")} color="primary">
                                    Cancel
                                    </Button>
                                <Button variant="contained" onClick={() => this.handleAddNewValue(spec.name + "Popup", spec.id, idx)} color="primary" autoFocus>
                                    Add
                                    </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    )
                }
            </React.Fragment>
        );
    }
}


export default withStyles(styles)(CategoryForm);