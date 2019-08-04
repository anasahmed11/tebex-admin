import React from 'react';
import 'typeface-roboto';
import { withStyles, Grid, Typography, Button, TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, MenuItem } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon} from '@material-ui/icons';
import uuid from 'uuid';


const styles = theme => ({
    
    expanDetails:{
        display:'inherit'
    },
    textHead:{
        fontWeight:'500',
        marginBottom: theme.spacing(4),
    },
    padding:{
        padding: `${theme.spacing(2)}px 0px`,
    }
    
});


class Profile extends React.Component{
    state ={
        expanded:0,
    }

    handlePanelChange = panel => event => {
        this.setState({
          expanded: panel,
        });
    };

    render(){
        const {classes, components } = this.props;
        
        return(
            <React.Fragment>
                {
                    components.map((comp,idx)=>(
                        <ExpansionPanel 
                            key={uuid()}
                            expanded={this.state.expanded===idx}
                            onChange={this.handlePanelChange(idx)} 
                            >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{comp.title}</Typography>
                            </ExpansionPanelSummary>
                            
                            <ExpansionPanelDetails className={classes.expanDetails}>
                                {comp.component}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))
                }


            </React.Fragment>
            
        

        );

        
    }


}


export default withStyles(styles)(Profile);