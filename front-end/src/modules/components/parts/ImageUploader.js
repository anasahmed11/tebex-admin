import React from 'react';

import { withStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';
import { Cancel, CloudUpload } from '@material-ui/icons';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './styles/componentAddDelete.css';
import { baseURL } from '../../../api/api';

import styles from '../../../assets/jss/components/parts/ImageUploader';

const ImageBody = withStyles(styles)(props => {
    const src = props.src;
    const { classes } = props;
    
    if (src.slice(0, 9) === '/storage')
        return "BBBB"
    
    else return <Grid item lg={4} md={6} xs={12} style={{ position: 'relative' }}>
        <Cancel onClick={() => props.handleDelete(props.id)} color="secondary" className={classes.deleteIcon} />
        <img style={{ width: '100%' }} src={src} alt="ImageUpload" />
    </Grid>
});

const getImageFormUrl = (url, callback) => {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function (a) {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURI = canvas.toDataURL("image/jpg");

        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return callback(new Blob([ia], { type: mimeString }));
    }

    img.src = url;
}

class ImageUploadAndPreview extends React.Component {
    state = {
        images: [],
        files: [],
    }

    handleDelete = (id) => {

        const images = [...this.state.images];
        images.splice(id, 1);
        const files = [...this.state.files];
        files.splice(id, 1);

        this.setState({ images: images, files: files })

    }

    getData = () => {
        if (this.state.files.length === 0) return false
        return this.state.files
    }

    fileReader = (file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                files: [...this.state.files, file],
                images: [...this.state.images, reader.result]
            });
        }
        reader.readAsDataURL(file)
    }
    handleChange = (event) => { 
        for(let file of event.target.files)
            this.fileReader(file)
        event.target.value = ""
    }
    componentDidMount() {

        this.props.setChildCallback(this.getData)
        
        if(this.props.images)
            for (let image of this.props.images) {
                getImageFormUrl(baseURL + image.slice(1), (BlobImage) => {
                    var file = new File([BlobImage], "name");
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        this.setState({
                            files: [...this.state.files, file],
                            images: [...this.state.images, reader.result]
                        });
                    }
                    reader.readAsDataURL(file)
                });
            }
    }
    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <ReactCSSTransitionGroup
                    component={Grid}
                    spacing={2}
                    container
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionName="componentAddDelete"
                >
                    {this.state.images.map((path, idx) => <ImageBody src={path} handleDelete={this.handleDelete} id={idx} />)}
                </ReactCSSTransitionGroup>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <input
                        className={classes.input}
                        style={{ display: 'none' }}
                        onChange={this.handleChange}
                        id="raised-button-file"
                        type="file"
                        multiple
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" className={classes.button}>
                            Upload
                            <CloudUpload className={classes.rightIcon} />
                        </Button>
                    </label>

                </Grid>
            </Grid>

        )
    }


}

export default withStyles(styles)(ImageUploadAndPreview);