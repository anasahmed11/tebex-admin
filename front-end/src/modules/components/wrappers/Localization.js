import globalVariables from '../../../global-variables';

function Localization(props){
    return globalVariables[props.title][globalVariables.LANG]; 
}

export default Localization;