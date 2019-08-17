import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ScrollAnimation from 'react-animate-on-scroll';
import uuid from 'uuid';

import LinedTitle from '../parts/TwoLinesSectionTitle';

const styles = theme => ({
    root: {
        textAlign:'center',
        background: 'purple'
    },
    icon: {
        color: 'white',
        fontSize: '15vh',
        background: '#38c49d',
        padding: theme.spacing(1),
        marginRight: theme.spacing(2),
    },
    infoSection: {
        display: 'flex',
        marginBottom: theme.spacing(4),
    },
    infoText: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        color: 'yellow',
    },
    desc: {
        color: 'white',
    }
});

const info = [
    {
        title:'نبذة عن الشركة',
        description:`هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
        image:'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
    },
    {
        title:'نبذة عن الشركة طويلة',
        description:`هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
        image:'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
    },
    {
        title:'نبذة عن الشركة',
        description:`هدفنا هو توفير خدمة بيع ممتازة وإرضاء ضيوفنا بافضل خدمة وافضل الاسعار شركة معرفش اسمها ايه مختلة عن اي شركة تسويق اخرى  حيث اننا نحاول بلاب بلاب عن طريق توفير بلاب بلاب ويمكنكم زيارة فروعنا في محافظات كذا وكذا`,
        image:'https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Company-512.png',
    },
]

class CompanyInfo extends React.Component {
    state = {
        display: 0,
    };

    _handleWaypointEnter = () =>{
        const display = this.state.display;
        this.setState({display:display+1});
    }

    render(){
        const {classes} = this.props;

        return (
            <Grid container justify='center' alignItems='center' className={classes.root} >
                <LinedTitle>
                    بلاب بلاب
                </LinedTitle>
                <Grid container item lg={8} md={10} sm={11}>
                    {info.map(item =>
                    <ScrollAnimation  key={uuid()} animateIn="slideInUp" animateOnce={true}>
                        <section className={classes.infoSection}>
                            <FontAwesomeIcon className={classes.icon} icon={['fab', 'facebook']} />
                            <div className={classes.textSection}>
                                <Typography align='left' className={classes.title} variant='h6'>{item.title}</Typography>
                                <Typography align='left' className={classes.desc} variant='subtitle1'>{item.description}</Typography>
                            </div>
                        </section>
                    </ScrollAnimation>
                    )}
                </Grid>
            </Grid>
        );


    }
}


export default withStyles(styles)(CompanyInfo);