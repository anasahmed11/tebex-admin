


import React from "react";
import { withStyles } from "@material-ui/core";
import styles from '../../../formStyling';

function formm(props) {
    const { classes, register, errors } = props;

    return (
        <div className={classes.root}>
            <div>
                <label htmlFor="name_en">Name (english)</label>
                <input type="text" placeholder="" name="name_en" ref={register({ required: true, minLength: 15 })} />
                {errors.name_en && <p>This field is required and length bigger than 15</p>}
            </div>

            <div>
                <label htmlFor="name">الاسم (بالعربي)</label>
                <input type="text" placeholder="" name="name" ref={register({ required: true, minLength: 15 })} />
                {errors.name && <p>This field is required and length bigger than 15</p>}
            </div>

            <div>
                <label htmlFor="price">Price</label>
                <input type="text" placeholder="" name="price" ref={register({ required: true, pattern: /^\d+$/ })} />
                {errors.price && <p>This field is required and has to be a number</p>}
            </div>

            <div>
                <label htmlFor="sale_price">Sale Price</label>
                <input type="text" placeholder="" name="sale_price" ref={register({ required: true, pattern: /^\d+$/ })} />
                {errors.sale_price && <p>This field is required and has to be a number</p>}
            </div>

            <div>
                <label htmlFor="quantity">Quatnity</label>
                <input type="text" placeholder="" name="quantity" ref={register({ required: true, pattern: /^\d+$/ })} />
                {errors.quantity && <p>This field is required and has to be a number</p>}
            </div>

            <div>
                <label htmlFor="sku">SKU</label>
                <input name="sku" placeholder="" ref={register({ required: true })} />
                {errors.sku && <p>This field is required</p>}
            </div>


            {
                // <div>
                //   <label htmlFor="brand">Brand</label>
                //   <input name="brand" placeholder="" ref={register({required: true})} />
                // </div>

                // <div>
                //   <label htmlFor="model_number">Model Number</label>
                //   <input name="model_number" placeholder="" ref={register} />
                // </div>
                // <div>
                //   <label htmlFor="made_in">Made In</label>
                //   <input name="made_in" placeholder="" ref={register({required: true})} />
                // </div>
                // <div>
                //   <label htmlFor="material">Material</label>
                //   <input name="material" placeholder="" ref={register} />
                // </div>
            }
        </div>
    );
}


export default withStyles(styles)(formm);