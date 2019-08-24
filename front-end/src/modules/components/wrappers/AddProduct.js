import React from 'react';
import useForm from "react-hook-form"
import { ClipLoader } from 'react-spinners';
import { convertToRaw, convertFromRaw } from 'draft-js';
import 'typeface-roboto';
import { withStyles, Grid, Typography, Snackbar, Button, } from '@material-ui/core';
import ExapndPanel from './ExapndPanel';

import CategoryForm from '../parts/CategoryForm';
import MainProductInfoForm from '../parts/MainProductInfoFrom';
import ImageUploadAndPreview from '../parts/ImageUploader';
import GeneralDescrptionForm from '../parts/GeneralDescriptionForm';
import MySnackbar from '../parts/MySnackbar';

import { productsAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/wrappers/AddProduct';
import RichEditor from '../parts/RichText';

let getChildData;
let getImageChildData;
let getDescription1;
let getDescription2;

const AddProduct1 = props => {

    const { register, handleSubmit, errors } = useForm({
        defaultValues: props.defaultValues

    });
    const [isPopup, setPopup] = React.useState(false);
    const [serverMessage, setServerMessage] = React.useState('');
    const [messageType, setMessageType] = React.useState('error');

    const { classes, } = props;

    const setChildCallback = (callback) => { getChildData = callback; }
    const setImageChildCallback = (callback) => { getImageChildData = callback }
    const setDescriptionChildCallback1 = (callback) => { getDescription1 = callback }
    const setDescriptionChildCallback2 = (callback) => { getDescription2 = callback }

    const onSubmit = data => {
        console.log(JSON.stringify(convertToRaw(getDescription1())).length);
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

        const description1 = getDescription1();
        if(description1.getPlainText('').length<50){
            message += 'description arabic should be more than 50 character.';
            valid = false;
        }
        else formData.append('description',JSON.stringify(convertToRaw(description1)));
        
        const description2 = getDescription2();
        if(description2.getPlainText('').length<50){
            message += 'description english should be more than 50 character.';
            valid = false;
        }
        else formData.append('description_en',JSON.stringify(convertToRaw(description2)));
        
        
        delete data.image
        for (var key in data) formData.append(key, data[key]);
        
        formData.append('commission','20');

        console.log(...formData);
        
        if(valid===false){
            console.log(message)
            setServerMessage(message);
            setPopup(true);
            setMessageType('error')
            return
        }
        if(props.edit){
            productsAPI.post(`update/${props.edit}/`,formData)
            .then(res=>{
                setServerMessage('Data saved successfully');
                setPopup(true);
                setMessageType('success')
            })
            .catch(err => {
                setServerMessage('A problem with serever occured, contact seller support');
                setPopup(true);
                setMessageType('error')
            });
        }
        else
            productsAPI.post('', formData)
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
            component: <CategoryForm edit={props.edit}  defaultValues={props.defaultValues} setChildCallback={setChildCallback} />
        },
        {
            title: 'General Description',
            //component: <GeneralDescrptionForm errors={errors} register={register} />
            component:
            [ 
                <RichEditor 
                    intial={props.defaultValues.description} 
                    setChildCallback={setDescriptionChildCallback1} 
                />,  
                <RichEditor
                    intial={props.defaultValues.description_en} 
                    setChildCallback={setDescriptionChildCallback2} 
                />
            ]
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
            <Grid container component="form" onSubmit={(e)=>{e.preventDefault(); console.log("hhhh");}} justify="center" item spacing={2} xs={12}>
                <Grid item xs={12}>
                    <ExapndPanel components={component} />
                </Grid>
                <Grid item xs={3}>

                    <Button fullWidth type='submit' color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>{props.edit?'Edit':'Add'}</Button>
                  

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