import React from 'react';
import globalVariables from '../../../global-variables';

import { withStyles, Grid, Typography, Divider } from '@material-ui/core';
import 'typeface-roboto';

import ProductSpec from '../parts/SelectMenu';

import styles from '../../../assets/jss/components/wrappers/ProductSpecs';
import RichEditor from '../parts/RichText';


const ProductSpecs = props => {

    const { classes, specs, title, salePrice, price, productSpecs } = props;
    return (
        <div>
            <Typography className={classes.title} variant="h6" align="left">
                {title}
            </Typography>
            <div className={classes.section}>
                <p>
                    <Typography variant="caption">كــود</Typography>
                    <Typography  variant="caption">A-MOBILE123-2019</Typography>
                </p>
                <p>
                    <Typography variant="caption">البائع</Typography>
                    <Typography className={classes.seller} variant="caption">UYC Trades</Typography>
                </p>
            </div>

            <div className={classes.section}>
                <p>
                    <Typography variant="caption">قبل الخصم</Typography>
                    <Typography className={classes.oldPrice} variant="caption">3500 جنيه</Typography>
                </p>
                <p>
                    <Typography variant="caption">السعــر</Typography>
                    <Typography className={classes.price} variant="caption">3000 جنيه</Typography>
                </p>
                <p>
                    <Typography variant="caption">ستوفـر</Typography>
                    <Typography className={classes.saving} variant="caption">500 جنيه</Typography>
                </p>
            </div>

            <Divider className={classes.divider} />
            
            <Typography className={classes.specsTitle} variant="h6">
                المواصفات
            </Typography>
            <div className={classes.section} style={{borderCollapse: 'separate', borderSpacing: '6px',}}>
                <p>
                    <Typography className={classes.specName} variant="caption">الذاكرة</Typography>
                    <Typography variant="caption" className={classes.specButton}>64GB</Typography>
                    <Typography variant="caption" className={classes.specButtonActive}>128GB</Typography>
                    <Typography variant="caption" className={classes.specButton}>256GB</Typography>
                </p>
                <p>
                    <Typography className={classes.specName} variant="caption">اللـون</Typography>
                    <Typography variant="caption" className={classes.specButton}>احمر</Typography>
                    <Typography variant="caption" className={classes.specButton}>ازرق</Typography>
                    <Typography variant="caption" className={classes.specButtonActive}>اسود</Typography>
                    <Typography variant="caption" className={classes.specButton}>ذهبي</Typography>
                </p>
            </div>

            <Divider className={classes.divider} />
            
            <Typography className={classes.specsTitle} variant="h6">
                الوصف
            </Typography>

            <Typography className={classes.productDesc}>
            هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا
            </Typography>
        </div>
    );
}

export default withStyles(styles)(ProductSpecs);
