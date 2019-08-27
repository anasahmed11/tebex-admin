import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import "animate.css/animate.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import store from './store/store';

// For debugging

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();