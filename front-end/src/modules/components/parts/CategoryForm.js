


import React from "react";
import { withStyles, TextField, MenuItem } from "@material-ui/core";
import uuid from 'uuid';
import { categoryAPI } from "../../../api/api";

const styles = theme => ({
    padding: {
        padding: `${theme.spacing(2)}px 0px`,
    },
    margin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

});

const getLeaves = (cats) => {
    let leaves = []

    for (let cat of cats) {
        if (cat.children.length)
            leaves = [...leaves, ...getLeaves(cat.children)];
        else
            leaves = [...leaves, cat];
    }

    return leaves
}

class CategoryForm extends React.Component {
    state = {
        isLoading: true,
        specsError: {},

        CATEGORIES: [],
        category: '',
        categoryError: '',
        categorySpecs: []
    }


    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
        if (prop === "category") {
            this.setState({ isLoading: false })
            categoryAPI.get(`${event.target.value}/specs/`)
                .then(res => {
                    this.setState({
                        categorySpecs: res.data[event.target.value],
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


        let data = {
            category: this.state.category
        };
        let idx = 0
        for (let spec of this.state.categorySpecs) {
            const id = spec.id;
            const name = spec.name_en;
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
                console.log(res.data)
                if (this.props.edit) {
                    categoryAPI.get(`${this.props.defaultValues.category_id}/specs/`)
                        .then(res => {
                            let specsData = {};
                            for(let spec of this.props.defaultValues.specs) specsData = {...specsData, [spec.name_en]:spec.pivot.spec_id}
                            console.log(res.data)
                            this.setState({
                                categorySpecs: res.data[this.props.defaultValues.category_id],
                                isLoading: false,
                                CATEGORIES: leaves,
                                category: this.props.defaultValues.category_id,
                                ...specsData
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else {
                    this.setState({ isLoading: false, CATEGORIES: leaves });
                }
            })
            .catch(err => {
                
            })
    }
    render() {
        const { classes } = this.props;
        console.log("CAT", this.state.categorySpecs);
        
        return (
            <React.Fragment>
                {this.state.isLoading ? null :

                    <TextField
                        className={classes.margin}
                        id={uuid()}
                        select
                        label="القسم"
                        type="text"
                        error={this.state.categoryError?true:false}
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
                                {option.name_en}
                            </MenuItem>
                        ))}
                    </TextField>
                }

                {
                    this.state.categorySpecs.map(spec => <TextField
                        className={classes.margin}
                        id={uuid()}
                        select
                        label={spec.name}
                        type="text"
                        error={this.state.specsError[spec.name_en]?true:false}
                        helperText={this.state.specsError[spec.name_en] ? this.state.specsError[spec.name_en] : ''}
                        value={this.state[spec.name_en]}
                        onChange={this.handleChange(spec.name_en)}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    >
                        {spec.values.ar.map((value, idx) => (
                            <MenuItem  value={idx}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                    )
                }

            </React.Fragment>

        );


    }
}


export default withStyles(styles)(CategoryForm);