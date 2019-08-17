import React from 'react';

import { withStyles, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon} from '@material-ui/icons';
import 'typeface-roboto';

import styles from '../../../assets/jss/components/wrappers/ExpandPanel';

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
                            key={idx}
                            expanded={this.state.expanded===idx}
                            onChange={this.handlePanelChange(idx)} 
                            >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{comp.title}</Typography>
                            </ExpansionPanelSummary>
                            
                            <ExpansionPanelDetails className={classes.expandDetails}>
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