import React from 'react';
import { Helmet } from "react-helmet";
import globalVariables from '../../global-variables';

import { Grid, Typography, Divider, List, ListItem, ListItemIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'typeface-roboto';

import styles from '../../assets/jss/views/Info';

const title = {en: 'Information', ar: 'معلومات'}
const data = [
    {
        title: {en: 'How are you?', ar: 'كيف حالك؟'},
        text: {
            ar: 'الكلام كتير يا زميلي ومكسل اكتب فا هعمل كوبي خد اهو الكلام كتير يا زميلي ومكسل اكتب فا هعمل كوبي خد اهو الكلام كتير يا زميلي ومكسل اكتب فا هعمل كوبي خد اهو ',
            en: 'Too much to type and I\'m lazy so I\'m gonna copy here is it Too much to type and I\'m lazy so I\'m gonna copy here is it Too much to type and I\'m lazy so I\'m gonna copy here is it',
        }
    },
    {
        title: {en: 'How are you?', ar: 'كيف حالك؟'},
        text: {
            ar: 'الكلام كتير يا زميلي ومكسل اكتب فا هعمل كوبي خد اهو الكلام كتير يا زميلي ومكسل اكتب فا هعمل كوبي خد اهو الكلام كتير يا زميلي ومكسل اكتب فا هعمل كوبي خد اهو ',
            en: 'Too much to type and I\'m lazy so I\'m gonna copy here is it Too much to type and I\'m lazy so I\'m gonna copy here is it Too much to type and I\'m lazy so I\'m gonna copy here is it',
        }
    },
]
const Info = props => {
    const { classes } = props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{globalVariables.PAGE_TITLE_HOME[globalVariables.LANG]}</title>
        </Helmet>
        <Grid className={classes.root} justify='center' container>
            <Grid container item sm={10} xs={11}>
                <Typography className={classes.title} variant='h2'>
                    {title[globalVariables.LANG]}
                </Typography>
                <Divider className={classes.divider} />
                <List>
                    {data.map(item =>
                    <ListItem disableGutters>
                        <ListItemIcon className={classes.listIcon}>
                            <FontAwesomeIcon className={classes.icon} icon={['fas', 'heart']} />
                        </ListItemIcon>
                        <div>
                            {item.title?
                            <Typography className={classes.textTitle} gutterBottom variant='h6'>
                                {item.title[globalVariables.LANG]}
                            </Typography> : null}
                            <Typography className={classes.text} variant='subtitle1'>
                                {item.text[globalVariables.LANG]}
                            </Typography>
                        </div>
                    </ListItem>)}
                </List>
            </Grid>
        </Grid>
      </React.Fragment>
    );

}

export default withStyles(styles)(Info);