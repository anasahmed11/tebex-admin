import React from 'react';
import useForm from "react-hook-form"
import { ClipLoader } from 'react-spinners';
import { convertToRaw } from 'draft-js';
import 'typeface-roboto';
import { withStyles, Grid, Typography, Snackbar, Button, } from '@material-ui/core';
import ExapndPanel from './ExapndPanel';

import CategoryForm from '../parts/CategoryForm';
import MainProductInfoForm from '../parts/MainProductInfoFrom';
import ImageUploadAndPreview from '../parts/ImageUploader';
import MySnackbar from '../parts/MySnackbar';

import { productsAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/wrappers/AddProduct';
import RichEditor from '../parts/RichText';
import MyClipLoader from '../parts/MyClipLoader';
import globalVariables from '../../../global-variables';

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
    const [isLoading, setIsLoading] = React.useState(false);

    const { classes, } = props;

    const setChildCallback = (callback) => { getChildData = callback; }
    const setImageChildCallback = (callback) => { getImageChildData = callback }
    const setDescriptionChildCallback1 = (callback) => { getDescription1 = callback }
    const setDescriptionChildCallback2 = (callback) => { getDescription2 = callback }

    const onSubmit = data => {
        setIsLoading(true)

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
        

        if(valid===false){
            setServerMessage(message);
            setPopup(true);
            setMessageType('error')
            setIsLoading(false)
            return
        }
        if(props.edit){
            productsAPI.post(`update/${props.edit}/`,formData)
            .then(res=>{
                setServerMessage('Data saved successfully, and waiting for admin approval.');
                setPopup(true);
                setIsLoading(false)
                setMessageType('success')
            })
            .catch(err => {
                setServerMessage('A problem with serever occured, contact seller support');
                setPopup(true);
                setIsLoading(false)
                setMessageType('error')
            });
        }
        else
            productsAPI.post('', formData)
                .then(res => {
                    setServerMessage('Data saved successfully');
                    setPopup(true);
                    setIsLoading(false)
                    setMessageType('success')

                })
                .catch(err => {
                    setServerMessage('A problem with serever occured, contact seller support');
                    setPopup(true);
                    setIsLoading(false)
                    setMessageType('error')
                });
        
    };
    

    
    const component = [
        {
            title: globalVariables.PRODUCT_MAIN_INFO[globalVariables.LANG],
            component: <MainProductInfoForm errors={errors} register={register} />
        },
        {
            title: globalVariables.PRODUCT_IMAGES[globalVariables.LANG],
            component: <ImageUploadAndPreview images={props.defaultValues.images} setChildCallback={setImageChildCallback} />
        },
        {
            title: globalVariables.PRODUCT_CATEGORIES[globalVariables.LANG],
            component: <CategoryForm edit={props.edit}  defaultValues={props.defaultValues} setChildCallback={setChildCallback} />
        },
        {
            title: globalVariables.PRODUCT_DESCRIPTION[globalVariables.LANG],
            //component: <GeneralDescrptionForm errors={errors} register={register} />
            component:
            [
                <div key={1} style={{marginBottom:'20px'}}>
                    <label htmlFor="description">الوصف(بالعربي)</label>
                    <RichEditor 
                        intial={props.defaultValues.description} 
                        setChildCallback={setDescriptionChildCallback1} 
                    />  
                </div>, 
                <div key={2} style={{direction:'ltr'}}>
                    <label htmlFor="description">Descrption (en)</label>
                    <RichEditor
                        intial={props.defaultValues.description_en} 
                        setChildCallback={setDescriptionChildCallback2} 
                    />
                </div>
            ]
        },

    ];


    return (
        <Grid container item justify='center' xs={11}>

            <MyClipLoader isLoading={isLoading} />
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
            <Grid container component="form" onSubmit={(e)=>{e.preventDefault();}} justify="center" item spacing={2} xs={12}>
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
        if (productID) {
            productsAPI.get(`seller/${productID}`)
                .then(res => {
                    this.setState({ data: res.data, isLoading: false })
                })
                .catch(err => {
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