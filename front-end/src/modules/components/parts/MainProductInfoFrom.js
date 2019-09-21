import React from "react";
import { withStyles } from "@material-ui/core";

import styles from '../../../assets/jss/components/parts/GeneralDescriptionForm';
import globalVariables from "../../../global-variables";

const form = props => {

    const { classes, register, errors } = props;

    return (
        <div className={classes.root}>
            <div>
                <label htmlFor="name_en">Name (english)</label>
                <input style={{direction:'ltr'}} type="text" placeholder="" name="name_en" ref={register({ required: true, minLength: 15 })} />
                <p class="desc">{globalVariables.PRODUCT_NAME_DESC[globalVariables.LANG]}</p>
                {errors.name_en && <p>This field is required and length bigger than 15</p>}
               
            </div>

            <div>
                <label htmlFor="name">الاسم (بالعربي)</label>
                <input type="text" placeholder="" name="name" ref={register({ required: true, minLength: 15 })} />
                {errors.name && <p>This field is required and length bigger than 15</p>}
            </div>

            <div>
                <label htmlFor="price">{globalVariables.LABEL_PRICE[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="price" ref={register({ required: true, pattern: /^\d+$/ })} />
                {errors.price && <p>This field is required and has to be a number</p>}
            </div>

            <div>
                <label htmlFor="sale_price">{globalVariables.LABEL_SALE_PRICE[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="sale_price" ref={register({ required: true, pattern: /^\d+$/ })} />
                {errors.sale_price && <p>This field is required and has to be a number</p>}
            </div>

            <div>
                <label htmlFor="commission">{globalVariables.LABEL_COMMISSION[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="commission" ref={register({ required: true, pattern: /^\d+$/, max: 40, min: 20 })} />
                <p class="desc">{globalVariables.PRODUCT_COMMISSION_DESC[globalVariables.LANG]}</p>
                {errors.commission && <p>This field is required and has to be a number between 20, 40 %</p>}
            </div>

            <div>
                <label htmlFor="quantity">{globalVariables.LABEL_QUANTITY[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="quantity" ref={register({ required: true, pattern: /^\d+$/ })} />
                {errors.quantity && <p>This field is required and has to be a number</p>}
            </div>

            <div>
                <label htmlFor="sku">SKU</label>
                <input name="sku" placeholder="" ref={register({ required: true })} />
                <p class="desc">{globalVariables.PRODUCT_SKU_DESC[globalVariables.LANG]}</p>
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


export default withStyles(styles)(form);