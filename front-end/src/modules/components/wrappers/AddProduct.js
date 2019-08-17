import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, Snackbar, } from '@material-ui/core';
import ExapndPanel from './ExapndPanel';
import useForm from "react-hook-form"

import CategoryForm from '../parts/CategoryForm';
import MainProductInfoForm from '../parts/MainProductInfoFrom';
import ImageUploadAndPreview from '../parts/ImageUploadAndPreview';

import GeneralDescrptionForm from '../parts/GeneralDescrptionForm';
import { ClipLoader } from 'react-spinners';
import { productsAPI } from '../../../api/api';
import MySnackbar from '../parts/MySnackbar';

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


let getChildData;
let getImageChildData;

function AddProduct1(props) {


    const { register, handleSubmit, errors } = useForm({
        defaultValues: props.defaultValues

    });
    const [isPopup, setPopup] = React.useState(false);
    const [serverMessage, setServerMessage] = React.useState('');
    const [messageType, setMessageType] = React.useState('error');

    const { classes, } = props;

    const setChildCallback = (callback) => { getChildData = callback; }
    const setImageChildCallback = (callback) => { getImageChildData = callback }

    const onSubmit = data => {
        let message = '';
        let valid = true;
        let formData = new FormData();

        const childData = getChildData();
        if (childData === false) {
            message += 'select a category and specs.';
            valid = false;
        }
        else for (var key in childData) formData.append(key, childData[key]);
        
        const imageFiles = getImageChildData();
        if (imageFiles === false) {
            message += ' Upload Some Images.';
            valid = false;
        }
        else for (let imageFile of imageFiles)  formData.append("image[]", imageFile);

       
        
        
        delete data.image
        for (var key in data) formData.append(key, data[key]);
        


        console.log(...formData);
        
        if(valid===false){
            console.log(message)
            setServerMessage(message);
            setPopup(true);
            setMessageType('error')

        }
        else
            productsAPI.post('add/', formData)
                .then(res => {
                    setServerMessage('Data saved successfully');
                    setPopup(true);
                    setMessageType('success')

                })
                .catch(err => {
                    setServerMessage('A problem with serever occured, contact seller support');
                    setPopup(true);
                    setMessageType('error')
                });
        
    };
    const onEdit = data => {
        console.log("onEdit", data)
    };

    
    const component = [
        {
            title: 'Main Information',
            component: <MainProductInfoForm errors={errors} register={register} />
        },
        {
            title: 'Images',
            component: <ImageUploadAndPreview images={props.defaultValues.images} setChildCallback={setImageChildCallback} />
        },
        {
            title: 'Category and Specs',
            component: <CategoryForm edit={props.edit} defaultValues={props.defaultValues} setChildCallback={setChildCallback} />
        },
        {
            title: 'General Description',
            component: <GeneralDescrptionForm errors={errors} register={register} />
        },

    ];


    return (
        <Grid container item justify='center' xs={11}>
             <Snackbar
                    style={{bottom:'50px'}}   
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={isPopup}
                    autoHideDuration={6000}
                    onClose={()=>setPopup(0)}
                >
                    <MySnackbar 
                        className={classes.margin}
                        onClose={()=>setPopup(0)}
                        variant={messageType}
                        message={serverMessage}
                        
                    />
                </Snackbar>
            <Grid item xs={12}>
                <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>{!props.edit ? 'اضافة منتج' : 'تعديل منتج'}</Typography>
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
        const productID = this.props.match.params.id;
        console.log(productID);
        if (productID) {
            productsAPI.get(productID)
                .then(res => {
                    this.setState({ data: res.data, isLoading: false })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false })
                })
        }
        else this.setState({ isLoading: false })
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
                <AddProduct edit={this.props.match.params.id} defaultValues={this.state.data} />

        )
    }

}
export default (Wrapper);