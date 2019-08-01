


import React from "react";
import { withStyles } from "@material-ui/core";
import styles from '../../../formStyling';

function formm(props) {
    const { classes, register } = props
  return (
    <div className={classes.root}>
        <div>
          <label htmlFor="youtube_url">Youtube URL</label>
          <input name="youtube_url" placeholder="" ref={register} />
        </div>

        <div>
          <label htmlFor="general_descrption_ar">General Descrption (ar)</label>
          <input name="general_descrption_ar" placeholder="" ref={register({required: true})} />
        </div>

        <div>
          <label htmlFor="general_descrption_en">General Descrption (en)*</label>
          <input name="general_descrption_en" placeholder="" ref={register({required: true})} />
        </div>

        <div>
          <label htmlFor="descrption_ar">Descrption (ar)</label>
          <input name="descrption_ar" placeholder="" ref={register} />
        </div>

        <div>
          <label htmlFor="descrption_en">Descrption (en)</label>
          <input name="descrption_en" placeholder="" ref={register} />
        </div>

        <div>
          <label htmlFor="waranty">Waranty</label>
          <input name="waranty" placeholder="" ref={register} />
        </div>

        <div>
          <label htmlFor="box_content_en">Box Content (en)</label>
          <input name="box_content_en" placeholder="" ref={register({required: true})} />
        </div>

        <div>
          <label htmlFor="box_content_ar">Box Content (ar)*</label>
          <input name="box_content_ar" placeholder="" ref={register({required: true})} />
        </div>

    </div>
  );
}


export default withStyles(styles)(formm);