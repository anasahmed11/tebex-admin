import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, } from '@material-ui/core';
import ExapndPanel from './ExapndPanel';
import useForm from "react-hook-form"

import MainProductInfoForm from '../parts/MainProductInfoFrom';
import GeneralDescrptionForm from '../parts/GeneralDescrptionForm';
import { ClipLoader } from 'react-spinners';
import { productsAPI } from '../../../api/api';

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

//this.props.match.params.id



function AddProduct1(props) {


    const { register, handleSubmit } = useForm({
        defaultValues: props.defaultValues

    });
    const { classes, } = props;


    const onSubmit = data => {
        console.log("SUBMITTED", data)


        


        let formData = new FormData();
        formData.append('image', document.getElementById('testImage').files);
        

        delete data.img
        data['specs[0][id]'] = 1;
        data['specs[0][value]'] = 1;
        data.category = 1
        data.slug = "12312dasd";
        data.image = [ document.getElementById('testImage').files ];
        for ( var key in data ) {
            formData.append(key, data[key]);
        }
        console.log(formData);

        // let reader = new FileReader();
        // console.log();
        // reader.onloadend = () => {
        //     data['image'] = reader.result;
        // }
        // reader.readAsDataURL(document.getElementById('testImage').files[0]);
        
        
        productsAPI.post('add/',formData)
        .then(res=>
            console.log(res))
        .catch(err=>
            console.log(err));
    };
    const onEdit = data => {
        console.log("onEdit", data)
    };


    const component = [
        {
            title: 'Main Information',
            component: <MainProductInfoForm register={register} />
        },
        {
            title: 'General Description',
            component: <GeneralDescrptionForm register={register} />
        }
    ];


    return (
        <Grid container item justify='center' xs={11}>
            <Grid item xs={12}>
                <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>اضافة منتج</Typography>
            </Grid>
            <Grid container justify="center" item xs={12}>
                <Grid item xs={12}>
                    <ExapndPanel components={component} />
                </Grid>
                <Grid item xs={12}>

                    <button onClick={handleSubmit(onSubmit)}>add</button>:
                    <button onClick={handleSubmit(onEdit)}>edit</button>

                </Grid>
            </Grid>
        </Grid>
    );

}



const AddProduct = withStyles(styles)(AddProduct1)
class Wrapper extends React.Component {
    state = {
        isLoading: true,
        data: {},
    }

    componentDidMount() {
        this.setState({ isLoading: false, data: { name_en: "abdo" } })
    }
    render() {
        const { isLoading } = this.state;
        return (
            isLoading ?
                <Grid container alignItems="center" justify="center" >
                    <ClipLoader
                        sizeUnit={"px"}
                        size={75}
                        color={'#123abc'}
                        loading={isLoading}
                    />
                </Grid> :
                <AddProduct defaultValues={this.state.data} />

        )
    }

}
export default (Wrapper);