


import React from "react";
import { withStyles } from "@material-ui/core";
import styles from '../../../formStyling';

function formm(props) {
  const { classes, register } = props
  return (
    <div className={classes.root}>

      <div>
        <label htmlFor="description">Descrption (ar)</label>
        <textarea rows="5" name="description" placeholder="" ref={register} />
      </div>

      <div>
        <label htmlFor="description_en">Descrption (en)</label>
        <textarea rows="5" name="description_en" placeholder="" ref={register} />
      </div>


    </div>
  );
}


export default withStyles(styles)(formm);