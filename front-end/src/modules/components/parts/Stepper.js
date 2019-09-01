import React from 'react';
import { Grid, Typography, Stepper, StepLabel, Step, withStyles }  from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../../assets/jss/components/parts/Stepper';

const MyStepper = props => {
    
    const { classes, steps, color, disabled, stepIndex } = props;
    return <Grid item className={classes.stepperContainer} style={{background: color}} xs={12}>
            {disabled? <span className={classes.indicator}>
                <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
            </span> : null}
            <Stepper activeStep={stepIndex} style={{background: color, opacity: disabled? 0.5 : 1}} className={classes.stepper} >
                {steps.map((label) =>
                    <Step key={label} >
                        <StepLabel> <Typography style={{padding:'0px 10px 0px 2px'}}>{label}</Typography> </StepLabel>
                    </Step>
                )}
            </Stepper>
        </Grid>
}

export default withStyles(styles)(MyStepper);