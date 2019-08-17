import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';
import { Cancel, CloudUpload } from '@material-ui/icons';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import './styles/componentAddDelete.css';

const styles = theme => ({
    padding: {
        padding: `%{theme.spacing(2)}px 0px`,
    },
    margin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    deleteIcon: {
        position: 'absolute',
        top: '-12px',
        left: '-12px',

        transitionProperty: 'transform, color',
        '&:hover': {
            color: 'darkred',
            transform: 'scale(1.2,1.2)',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
});

const Image = withStyles(styles)(function Image(props) {
    const src = props.src;
    const { classes } = props;
    if (src.slice(0, 9) === "\/storage") {

        return "BBBB"
    }
    else return <Grid item lg={4} md={6} xs={12} style={{ position: 'relative' }}>
        <Cancel onClick={() => props.handleDelete(props.id)} color="secondary" className={classes.deleteIcon} />
        <img style={{ width: '100%' }} src={src} />
    </Grid>
});


class ImageUploadAndPreview extends React.Component {
    state = {
        images: [],
        files: [],
    }

    handleDelete = (id) => {
        
        const images = [...this.state.images];
        images.splice(id,1);
        const files = [...this.state.files];
        files.splice(id,1);
        
        this.setState({ images: images, files: files })

    }
    
    getData = () => {
        if(this.state.files.length===0) return false
        return this.state.files
    }
    
    handleChange = (event) => {
        console.log(event.target)
        let reader = new FileReader();
        let file = event.target.files[0];
        console.log(file)
        reader.onloadend = () => {
            this.setState({
                files: [...this.state.files, file],
                images: [...this.state.images, reader.result]
            });
            console.log(reader.result)

        }
        reader.readAsDataURL(file)
        event.target.value = ""
    }
    componentDidMount(){
        this.props.setChildCallback(this.getData)

    }
    render() {
        const { classes } = this.props;
        
        return (
            <Grid container>
                <ReactCSSTransitionGroup component={Grid} spacing={2} container transitionName="componentAddDelete">
                    {this.state.images.map((path, idx) => <Image src={path} handleDelete={this.handleDelete} id={idx} />)}
                </ReactCSSTransitionGroup>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <input
                        className={classes.input}
                        style={{ display: 'none' }}
                        onChange={this.handleChange}
                        id="raised-button-file"
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" color="primary" component="span" className={classes.button}>
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