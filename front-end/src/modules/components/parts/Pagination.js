import React from 'react';
import Pagination from "material-ui-flat-pagination";
import Paginate from 'react-paginate';
// import globalVariables from '../../../global-variables';

import { withStyles } from '@material-ui/core';
import 'typeface-roboto';

import styles from '../../../assets/jss/components/parts/Pagination';
import  './styles/react-paginate.css';;

const disableStyle = {
    pointerEvents: 'none',
    opacity: '0.5',
}

function MyPagination(props){
    const { current_page, limit, total, disabled, handleClick } = props; // classes not used
    return <div id='react-paginate' style={disabled? disableStyle : {}}>
        <Paginate
            initialPage={current_page}
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={total}
            marginPagesDisplayed={2}
            pageRangeDisplayed={limit}
            onPageChange={handleClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            disableInitialCallback={true}
        />
    </div>
}

export default withStyles(styles)(MyPagination);