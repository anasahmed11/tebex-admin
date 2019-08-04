import React from 'react';
import { withStyles, Grid, Typography, Button,  } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';



const styles = theme => ({
    root: {
        padding: `${theme.spacing(12)}px 0px`,
        minHeight: '500px',
        alignItems: 'center',
        position:'relative',
        textAlign:'center',
    },

    paddingTop:{
        padding:'20px 0px'
    },
    button:{
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

function NotFound(props){
    const {classes} = props;
    return(

        <Grid container justify='center' alignItems="center" className={classes.root}> 
            <Grid container alignItems="center" justify="center" >
                    <ClipLoader
                        sizeUnit={"px"}
                        size={75}
                        color={'#123abc'}
                        loading={true}
                    />
                </Grid>
        </Grid>
    );


}

export default withStyles(styles)(NotFound);