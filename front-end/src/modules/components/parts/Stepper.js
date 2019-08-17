import React from 'react';
import { Grid, Typography, Stepper, StepLabel, Step, withStyles }  from '@material-ui/core';

import styles from '../../../assets/jss/components/parts/Stepper';

const MyStepper = props => {
    
    const { classes, steps, color, stepIndex } = props;
    return <Grid item className={classes.stepperContainer} style={{background: color}} xs={12}>
            <Stepper activeStep={stepIndex} style={{background: color}} className={classes.stepper} >
                {steps.map((label) =>
                    <Step key={label} >
                        <StepLabel> <Typography style={{padding:'0px 10px 0px 2px'}}>{label}</Typography> </StepLabel>
                    </Step>
                )}
            </Stepper>
        </Grid>
}

export default withStyles(styles)(MyStepper);