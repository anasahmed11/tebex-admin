import React from 'react';

import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import 'typeface-roboto';


class Profile extends React.Component {
    state = {
        expanded: 0,
    }

    handlePanelChange = panel => event => {
        this.setState({
            expanded: panel,
        });
    };

    render() {
        const { components } = this.props;

        return (
            <React.Fragment>
                {
                    components.map((comp, idx) => (
                        <ExpansionPanel
                            key={idx}
                            expanded={this.state.expanded === idx}
                            onChange={this.handlePanelChange(idx)}
                        >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >{comp.title}</Typography>
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails >
                                {comp.component}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))
                }
            </React.Fragment>
        );
    }
}

export default (Profile);