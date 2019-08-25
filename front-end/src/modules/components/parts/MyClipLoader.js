import React from 'react';
import { ClipLoader } from 'react-spinners';
import { withStyles } from '@material-ui/styles';
export const styles = theme => ({
    sweetLoading:{
        position: 'fixed',
        top:0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex:' 1000',
    },
    spinner:{
        display: 'block',
        width: 'fit-content',
        margin: '0 auto',
        top: 'calc(50% - 75px / 2)',
        position: 'relative',
    },
});


export default withStyles(styles)(function MyClipLoader(props){
    const {classes, isLoading} = props;
    const Loader = <div className={classes.sweetLoading}>
                        <div className={classes.spinner}>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={true}
                            />
                        </div>
                    </div>;
    return isLoading? Loader:null;
});