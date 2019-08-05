


import React from "react";
import { withStyles } from "@material-ui/core";
import styles from '../../../formStyling';

function formm(props) {
    const { classes, register } = props
  return (
    <div className={classes.root}>
        <div>
          <label htmlFor="name_en">Name (english)</label>
          <input type="text" placeholder="" name="name_en" ref={register({required: true, minLength: 2})} />
      
        </div>

        <div>
          <label htmlFor="name_ar">الاسم (بالعربي)</label>
          <input type="text" placeholder="" name="name_ar" ref={register({required: true, minLength: 2})} />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input type="text" placeholder="" name="price" ref={register({required: true, minLength: 2})} />
        </div>
        
        <div>
          <label htmlFor="sale_price">Sale Price</label>
          <input type="text" placeholder="" name="sale_price" ref={register({required: true, minLength: 2})} />
        </div>

        <div>
          <label htmlFor="brand">Brand</label>
          <input name="brand" placeholder="" ref={register({required: true})} />
        </div>

        <div>
          <label htmlFor="model_number">Model Number</label>
          <input name="model_number" placeholder="" ref={register} />
        </div>
        <div>
          <label htmlFor="made_in">Made In</label>
          <input name="made_in" placeholder="" ref={register({required: true})} />
        </div>
        <div>
          <label htmlFor="material">Material</label>
          <input name="material" placeholder="" ref={register} />
        </div>
    </div>
  );
}


export default withStyles(styles)(formm);